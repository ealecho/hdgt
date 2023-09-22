import * as React from 'react';
import {useLayout} from 'hooks';
import {Avatar} from '@ui-kitten/components';

import {Text, VStack, HStack} from 'components';
import ProgressBar from 'components/ProgressBar';
import {formatDefault} from 'utils/formatValue';

interface IMemberItemProps {
  user: {
    name: string;
    avatar: any;
  };
  contribute: number;
  percent: number;
}

const MemberItem = React.memo(({member}: {member: IMemberItemProps}) => {
  const {height, width, top, bottom} = useLayout();
  return (
    <VStack
      level="3"
      padding={16}
      mr={8}
      border={8}
      maxWidth={128 * (width / 375)}>
      <HStack itemsCenter mb={8}>
        <Avatar source={member.user.avatar} size="medium" />
        <VStack level="5" border={8} padding={4} ml={26}>
          <Text category="h6" status="white">
            {member.percent}%
          </Text>
        </VStack>
      </HStack>
      <Text
        marginBottom={16}
        category="h8"
        numberOfLines={2}
        left
        maxWidth={96 * (width / 375)}>
        {member.user.name}
      </Text>
      <ProgressBar progress={member.percent / 100} />
      <Text category="c1" marginTop={8}>
        {formatDefault(member.contribute.toFixed(0))}
      </Text>
    </VStack>
  );
});

export default MemberItem;
