import { ScrollView } from 'react-native';
import React from 'react';
import useUserCreatedGroup from '../hooks/useUserGroup';
import HListItem from './HListItem';

export default function UserCreatedGroupsList() {
  const { data } = useUserCreatedGroup();

  if (data) {
    return (
      <ScrollView>
        {data?.map((item, index) => {
          return <HListItem key={index} imgUrl={item?.photo_url} name={item?.group_name} />;
        })}
      </ScrollView>
    );
  }
}
