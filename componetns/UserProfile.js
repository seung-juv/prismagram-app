import React, { useState } from "react";
import { Image, View, Platform } from "react-native";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import propTypes from "prop-types";
import styles from "../styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import constants from "../constants";
import SquarePhoto from "./SquarePhoto";
import Post from "./Post";

const ProfileHeader = styled.View`
  padding: 15px;
  flex-flow: row nowrap;
  align-items: center;
`;
const HeaderColumn = styled.View``;
const ProfileStat = styled.View`
  flex-flow: row nowrap;
  margin-left: 30px;
`;
const Stat = styled.View`
  margin-right: 25px;
  justify-content: center;
`;
const StatNumber = styled.Text`
  text-align: center;
  font-size: 14px;
  font-weight: 500;
`;
const StatName = styled.Text`
  text-align: center;
  font-size: 12px;
  font-weight: 300;
`;
const ProfileMeta = styled.View`
  flex: 1;
  padding: 0 15px;
  margin-bottom: 15px;
`;

const Name = styled.Text`
  font-size: 12px;
  font-weight: 400;
  margin-bottom: 5px;
`;
const Bio = styled.Text`
  font-size: 12px;
  font-weight: 300;
`;

const EditProfileContainer = styled.View`
  flex: 1;
  padding: 0 15px;
  margin-bottom: 15px;
`;

const EditProfileButton = styled.Text`
  flex: 1;
  padding: 5px;
  font-size: 12px;
  text-align: center;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid ${styles.lightGreyColor};
`;

const ButtonContainer = styled.View`
  flex-flow: row nowrap;
  padding: 5px 0;
  border: 1px solid ${styles.lightGreyColor};
  border-left-width: 0;
  border-bottom-width: 0;
  border-right-width: 0;
`;

const Button = styled.View`
  width: ${constants.width / 2}px;
  align-items: center;
`;

const SquarePhotoContainer = styled.View`
  flex-flow: row nowrap;
  margin-left: -1px;
`;

const UserProfile = ({
  avatar,
  postsCount,
  followersCount,
  followingCount,
  fullName,
  bio,
  posts
}) => {
  const [isGrid, setIsgrid] = useState(true);
  const post = () => {
    if (posts && isGrid) {
      return (
        <SquarePhotoContainer>
          {posts.map(post => <SquarePhoto key={post.id} {...post} />)}
        </SquarePhotoContainer>
      );
    } else {
      return posts.map(post => <Post key={post.id} {...post} />);
    }
  };
  return (
    <View>
      <ProfileHeader>
        <Image style={{ width: 80, height: 80, borderRadius: 40 }} source={{ uri: avatar }} />
        <HeaderColumn>
          <ProfileStat>
            <Stat>
              <StatNumber>
                {postsCount}
              </StatNumber>
              <StatName>Post</StatName>
            </Stat>
            <Stat>
              <StatNumber>
                {followersCount}
              </StatNumber>
              <StatName>Followers</StatName>
            </Stat>
            <Stat>
              <StatNumber>
                {followingCount}
              </StatNumber>
              <StatName>Following</StatName>
            </Stat>
          </ProfileStat>
        </HeaderColumn>
      </ProfileHeader>
      <ProfileMeta>
        <Name>
          {fullName}
        </Name>
        <Bio>
          {bio}
        </Bio>
      </ProfileMeta>
      <EditProfileContainer>
        <EditProfileButton>Edit Profile</EditProfileButton>
      </EditProfileContainer>
      <ButtonContainer>
        <TouchableOpacity onPress={() => setIsgrid(true)}>
          <Button>
            <Ionicons
              color={isGrid ? styles.blackColor : styles.lightGreyColor}
              size={32}
              name={Platform.OS === "ios" ? "ios-grid" : "md-grid"}
            />
          </Button>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsgrid(false)}>
          <Button>
            <Ionicons
              color={!isGrid ? styles.blackColor : styles.lightGreyColor}
              size={32}
              name={Platform.OS === "ios" ? "ios-list" : "md-list"}
            />
          </Button>
        </TouchableOpacity>
      </ButtonContainer>
      {post()}
    </View>
  );
};

UserProfile.propTypes = {
  id: propTypes.string.isRequired,
  avatar: propTypes.string.isRequired,
  username: propTypes.string.isRequired,
  fullName: propTypes.string.isRequired,
  isFollowing: propTypes.bool.isRequired,
  isSelf: propTypes.bool.isRequired,
  bio: propTypes.string.isRequired,
  followingCount: propTypes.number.isRequired,
  followersCount: propTypes.number.isRequired,
  postsCount: propTypes.number.isRequired,
  posts: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.string.isRequired,
      user: propTypes.shape({
        id: propTypes.string.isRequired,
        avatar: propTypes.string,
        username: propTypes.string.isRequired
      }).isRequired,
      files: propTypes.arrayOf(
        propTypes.shape({
          id: propTypes.string.isRequired,
          url: propTypes.string.isRequired
        })
      ).isRequired,
      likeCount: propTypes.number.isRequired,
      isLiked: propTypes.bool.isRequired,
      comments: propTypes.arrayOf(
        propTypes.shape({
          id: propTypes.string.isRequired,
          text: propTypes.string.isRequired,
          user: propTypes.shape({
            id: propTypes.string.isRequired,
            username: propTypes.string.isRequired
          }).isRequired
        })
      ).isRequired,
      caption: propTypes.string.isRequired,
      location: propTypes.string,
      createdAt: propTypes.string.isRequired
    })
  )
};

export default UserProfile;
