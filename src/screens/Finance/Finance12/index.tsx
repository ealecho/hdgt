import * as React from 'react';
import {useLayout} from 'hooks';
import {
  StyleService,
  useStyleSheet,
  useTheme,
  Icon,
  Button,
  Avatar,
} from '@ui-kitten/components';

import {
  Container,
  Content,
  Text,
  NavigationAction,
  HStack,
  VStack,
  IDivider,
} from 'components';
import ProgressBar from 'components/ProgressBar';
import Images from 'assets/images';
import {formatDefault} from 'utils/formatValue';
import MemberItem from './MemberItem';
import {FlatList} from 'react-native';
import keyExtractor from 'utils/keyExtractor';

const Finance12 = React.memo(() => {
  const theme = useTheme();
  const {height, width, top, bottom} = useLayout();
  const styles = useStyleSheet(themedStyles);

  const ListHeader = () => {
    return (
      <>
        <HStack mh={24} mt={24} itemsCenter>
          <Text category="h6">Member (4)</Text>
          <HStack itemsCenter>
            <Button
              size="small"
              children={'Invite'}
              accessoryRight={<Icon pack="assets" name="user_plus" />}
            />
            <Icon pack="assets" name="caret_right" style={styles.caret} />
          </HStack>
        </HStack>
        <Content horizontal contentContainerStyle={styles.contentMember}>
          {DATA_MEMBER.map((member, index) => {
            return <MemberItem key={index} member={member} />;
          })}
        </Content>
        <HStack mt={20} mb={16} mh={24} itemsCenter>
          <Text category="h6">{'Transaction History'}</Text>
          <Icon pack="assets" name="caret_right" style={styles.caret} />
        </HStack>
      </>
    );
  };
  const ItemSeparator = () => {
    return <IDivider marginVertical={16} marginHorizontal={24} />;
  };
  return (
    <Container style={styles.container}>
      <VStack level="5" pt={top + 8} pb={28} mb={-24}>
        <HStack itemsCenter>
          <NavigationAction status="basic" />
          <Text category="h7" status="white">
            {'Buy House'}
          </Text>
          <NavigationAction status="basic" icon="pencil" />
        </HStack>
        <HStack ph={24} mt={16}>
          <Icon pack="assets" name="pin_map" style={styles.pin} />
          <Text category="h6" status="white">
            {'15%'}
          </Text>
        </HStack>
        <ProgressBar
          style={styles.progress}
          progress={15 / 100}
          progressColor={theme['text-white-color']}
          containColor={`${theme['background-basic-color-1']}20`}
        />
        <HStack mh={24}>
          <Text category="h8" status="white">
            $5,680.00
            <Text category="h8" status="white" opacity={0.7}>
              /$23,468.00
            </Text>
          </Text>
          <Text category="body" status="white">
            64 days left
          </Text>
        </HStack>
      </VStack>
      <FlatList
        data={LIST_TRANSACTION}
        style={styles.content}
        ListHeaderComponent={ListHeader}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.content}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({item}) => {
          return (
            <HStack justify="flex-start" mh={24} maxWidth={width - 48}>
              <Avatar size="giant" source={item.user.avatar} />
              <VStack style={styles.transTitle} ml={12}>
                <HStack mb={8}>
                  <Text category="body">{item.user.name}</Text>
                  <Text category="callout">
                    {formatDefault(item.value.toFixed(2))}
                  </Text>
                </HStack>
                <Text category="c1" status="platinum">
                  {item.date}
                </Text>
              </VStack>
            </HStack>
          );
        }}
      />
      <Button
        children={'Add money'}
        accessoryLeft={<Icon pack="assets" name="plus" />}
        style={styles.buttonStyle}
      />
    </Container>
  );
});

export default Finance12;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },
  pin: {
    width: 32,
    height: 32,
  },
  progress: {
    marginHorizontal: 24,
    marginTop: 8,
    marginBottom: 16,
  },
  contentContainer: {
    marginTop: -24,
    flexGrow: 1,
    borderRadius: 16,
  },
  content: {
    borderRadius: 16,
    backgroundColor: 'background-basic-color-1',
    paddingBottom: 24,
  },
  caret: {
    tintColor: 'text-primary-color',
    marginLeft: 12,
  },
  contentMember: {
    paddingHorizontal: 24,
    marginTop: 12,
  },
  transTitle: {
    flex: 1,
  },
  buttonStyle: {
    marginHorizontal: 24,
    marginVertical: 8,
  },
});
const DATA_MEMBER = [
  {
    user: {
      name: 'Cameron William',
      avatar: Images.avatar.avatar10,
    },
    contribute: 5869,
    percent: 14,
  },
  {
    user: {
      name: 'Christine Stewart',
      avatar: Images.avatar.avatar01,
    },
    contribute: 5869,
    percent: 14,
  },
  {
    user: {
      name: 'Savannah Nguyen',
      avatar: Images.avatar.avatar02,
    },
    contribute: 5869,
    percent: 14,
  },
  {
    user: {
      name: 'Will Smith',
      avatar: Images.avatar.avatar04,
    },
    contribute: 5869,
    percent: 14,
  },
];
const LIST_TRANSACTION = [
  {
    user: {
      name: 'Cameron William',
      avatar: Images.avatar.avatar10,
    },
    title: 'Add money',
    date: '10/10/2022 06:27',
    value: 14.4,
  },
  {
    user: {
      name: 'Christine Stewart',
      avatar: Images.avatar.avatar01,
    },
    title: 'Add money',
    date: '10/10/2022 06:27',
    value: 14.4,
  },
  {
    user: {
      name: 'Savannah Nguyen',
      avatar: Images.avatar.avatar02,
    },
    title: 'Add money',
    date: '10/10/2022 06:27',
    value: 14.4,
  },
  {
    user: {
      name: 'Will Smith',
      avatar: Images.avatar.avatar04,
    },
    title: 'Add money',
    date: '10/10/2022 06:27',
    value: 14.4,
  },
];
