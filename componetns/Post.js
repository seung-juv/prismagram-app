import React, { useState } from "react";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-swiper";
import { gql } from "apollo-boost";
import constants from "../constants";
import { Platform } from "react-native";
import styles from "../styles";
import { useMutation } from "react-apollo-hooks";
import { withNavigation } from "react-navigation";

const TOGGLE_LIKE = gql`
  mutation toggleLike($postId: String!) {
    toggleLike(postId: $postId)
  }
`;

const Container = styled.View`margin-bottom: 15px;`;

const Header = styled.View`
  flex-flow: row nowrap;
  align-items: center;
  padding: 12px 8px;
`;

const Touchable = styled.TouchableOpacity`
  flex: 0 0 auto;
  display: flex;
`;

const Avatar = styled.Image`
  width: 30px;
  height: 30px;
  border-radius: 20px;
`;

const HeaderUserContainer = styled.View`margin-left: 7px;`;

const Username = styled.Text`
  font-weight: 600;
  font-size: 13px;
`;

const Location = styled.Text`
  margin-top: 1px;
  font-size: 13px;
  font-weight: 300;
`;

const Slide = styled.View`
  width: 100%;
  height: 100%;
`;

const SlideImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const IconsContainer = styled.View`
  padding: 8px;
  flex-flow: row nowrap;
`;

const Icon = styled(Ionicons)`
  margin-right: 15px;
`;

const InfoContainer = styled.View`padding: 0 8px;`;

const LikeCount = styled.Text`
  font-weight: 500;
  font-size: 13px;
  margin-bottom: 5px;
`;

const CaptionContainer = styled.View`flex-flow: row nowrap;`;

const Caption = styled.Text`
  font-size: 13px;
  margin-left: 3px;
  font-weight: 300;
`;

const CommentCount = styled.Text`
  font-size: 13px;
  margin-top: 5px;
  font-weight: 300;
  color: ${styles.darkGreyColor};
`;

const Post = ({
  id,
  user,
  location,
  files = [],
  likeCount: likeCountProp,
  caption,
  comments = [],
  isLiked: isLikedProp,
  navigation
}) => {
  const [isLiked, setIsLiked] = useState(isLikedProp);
  const [likeCount, setLikeCount] = useState(likeCountProp);
  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
    variables: { postId: id }
  });
  const handleLike = async () => {
    setIsLiked(p => !p);
    if (isLiked) {
      setLikeCount(l => l - 1);
    } else {
      setLikeCount(l => l + 1);
    }
    try {
      await toggleLikeMutation();
    } catch (error) {}
  };
  return (
    <Container>
      <Header>
        <Touchable onPress={() => navigation.navigate("UserDetail", { username: user.username })}>
          <Avatar resizeMode={"contain"} source={{ uri: user.avatar }} />
        </Touchable>
        <Touchable onPress={() => navigation.navigate("UserDetail", { username: user.username })}>
          <HeaderUserContainer>
            <Username>
              {user.username}
            </Username>
            {!location === "" &&
              <Location>
                {location}
              </Location>}
          </HeaderUserContainer>
        </Touchable>
      </Header>
      <Swiper
        height={constants.height / 2.5}
        loop={false}
        paginationStyle={{
          marginBottom: -52
        }}
        dotStyle={{
          width: 6,
          height: 6
        }}
        activeDotStyle={{
          width: 6,
          height: 6
        }}
      >
        {files &&
          files.map(file =>
            <Slide key={file.id}>
              <SlideImage source={{ uri: file.url }} />
            </Slide>
          )}
      </Swiper>
      <IconsContainer>
        <Touchable onPress={handleLike}>
          <Icon
            size={24}
            color={isLiked ? styles.redColor : styles.blackColor}
            name={
              Platform.OS === "ios"
                ? isLiked ? "ios-heart" : "ios-heart-empty"
                : isLiked ? "md-heart" : "md-heart-empty"
            }
          />
        </Touchable>
        <Touchable>
          <Icon size={24} name={Platform.OS === "ios" ? "ios-text" : "md-text"} />
        </Touchable>
      </IconsContainer>
      <InfoContainer>
        <Touchable>
          <LikeCount>
            {`${likeCount} likes`}
          </LikeCount>
        </Touchable>
        <CaptionContainer>
          <Touchable>
            <Username>
              {user.username}
            </Username>
          </Touchable>
          {!caption === "" &&
            <Caption>
              {caption}
            </Caption>}
        </CaptionContainer>
        {comments.length > 0 &&
          <Touchable>
            <CommentCount>
              {comments.length >= 1 && `View all ${comments.length} comments`}
            </CommentCount>
          </Touchable>}
      </InfoContainer>
    </Container>
  );
};

export default withNavigation(Post);
