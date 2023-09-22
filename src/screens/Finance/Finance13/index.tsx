import * as React from 'react';
import {
  StyleService,
  useStyleSheet,
  TopNavigation,
  Input,
  IndexPath,
  Select,
  SelectItem,
  Avatar,
  Button,
} from '@ui-kitten/components';

import {
  Container,
  Content,
  Text,
  NavigationAction,
  VStack,
  HStack,
} from 'components';
import {formatDefault} from 'utils/formatValue';
import Images from 'assets/images';

const Finance13 = React.memo(() => {
  const styles = useStyleSheet(themedStyles);
  const selectRef = React.useRef<Select>(null);
  const [selectedTitle, setSelectedTitle] = React.useState('🍜');
  const [name, setName] = React.useState('Buy house');
  const [time, setTime] = React.useState('14');
  const [money, setMoney] = React.useState(1400);
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  const [isFocused, setIsFocused] = React.useState(false);
  return (
    <Container style={styles.container}>
      <TopNavigation accessoryLeft={<NavigationAction status="black" />} />
      <Content contentContainerStyle={styles.contentContainer}>
        <VStack mh={40}>
          <Text category="h2">Create Goals</Text>
          <Text category="body" marginBottom={16}>
            You want to save for...
          </Text>
        </VStack>
        <Content horizontal contentContainerStyle={styles.contentTitle}>
          {LIST_TITLE.map((title, index) => {
            const isActive = selectedTitle === title;
            return (
              <VStack
                key={index}
                mr={24}
                onPress={() => {
                  setSelectedTitle(title);
                }}>
                <Text
                  category="h1"
                  style={styles.title}
                  opacity={isActive ? 1 : 0.6}>
                  {title}
                </Text>
              </VStack>
            );
          })}
        </Content>
        <VStack mh={40}>
          <Input
            label={'Name goal'}
            size="giant"
            status="secondary"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
          <VStack>
            <Input
              label={'Time'}
              size="giant"
              status="secondary"
              style={styles.input}
              value={time}
              onChangeText={setTime}
              caption={<Text marginTop={8}>{'Time end: 20 Jun 2023'}</Text>}
              accessoryRight={() => {
                return (
                  <VStack
                    level="5"
                    border={8}
                    onPress={() => {
                      selectRef.current?.focus();
                    }}>
                    <Text
                      status="white"
                      marginHorizontal={8}
                      marginVertical={4}
                      category="subhead">
                      {LIST_TIME[selectedIndex.row]}
                    </Text>
                  </VStack>
                );
              }}
            />
            <Select
              style={[
                styles.select,
                selectRef.current?.isFocused && {
                  height: 120,
                  marginBottom: 40,
                  opacity: 1,
                },
              ]}
              ref={selectRef}
              selectedIndex={selectedIndex}
              onSelect={index => setSelectedIndex(index)}>
              <SelectItem title="Day" />
              <SelectItem title="Month" />
              <SelectItem title="Year" />
            </Select>
          </VStack>
          <Input
            label={'Money'}
            size="giant"
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              setIsFocused(false);
              setMoney(parseFloat(money.toString()));
            }}
            status="secondary"
            onChangeText={text => setMoney(text)}
            style={styles.input}
            value={
              isFocused ? money.toString() : formatDefault(money.toString(), '')
            }
            accessoryRight={() => {
              return (
                <Text status="placeholder" category="subhead">
                  USD
                </Text>
              );
            }}
          />
          <Text category="h6">With Friend</Text>
          <HStack justify="flex-start" mt={16}>
            <NavigationAction
              icon="plus"
              status="primary"
              style={styles.buttonPlus}
            />
            {LIST_FRIEND &&
              LIST_FRIEND.map((friend, index) => {
                return (
                  <Avatar source={friend.avatar} key={index} size="giant" />
                );
              })}
          </HStack>
        </VStack>
      </Content>
      <Button children={'Create Goal'} style={styles.button} />
    </Container>
  );
});

export default Finance13;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 16,
  },
  contentTitle: {
    paddingHorizontal: 40,
    marginBottom: 24,
  },
  title: {
    fontSize: 44,
    lineHeight: 48,
  },
  input: {
    borderRadius: 16,
    marginBottom: 24,
    zIndex: 100,
  },
  select: {
    position: 'absolute',
    right: 0,
    zIndex: -100,
    top: 25,
    left: 0,
  },
  buttonPlus: {
    borderRadius: 99,
    borderWidth: 0.7,
    borderStyle: 'dashed',
    width: 56,
    height: 56,
  },
  button: {
    marginHorizontal: 40,
    marginVertical: 8,
  },
});
const LIST_TITLE = [
  '🍜',
  '🚌',
  '🏠',
  '🔋',
  '☂️',
  '🏥',
  '🏖️️',
  '🎮',
  '💝',
  '🐶',
];
const LIST_TIME = ['day', 'month', 'year'];
const LIST_FRIEND = [{avatar: Images.avatar.avatar08}];
