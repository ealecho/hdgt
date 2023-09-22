import * as React from "react";
import { TouchableOpacity, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  StyleService,
  useStyleSheet,
  useTheme,
  TopNavigation,
  Avatar,
  Icon,
  Button,
} from "@ui-kitten/components";

import { Container, Text, NavigationAction, VStack, HStack } from "components";
import Images from "assets/images";
import keyExtractor from "utils/keyExtractor";
import _ from "lodash";
import ProgressBar from "components/ProgressBar";
import numeral from "numeral";

const Finance11 = React.memo(() => {
  const theme = useTheme();
  const { goBack } = useNavigation();
  const styles = useStyleSheet(themedStyles);

  const [selectTab, setSelectedTab] = React.useState(0);

  const ListHeaderComp = () => {
    return (
      <>
        <HStack style={styles.header}>
          <VStack>
            <HStack justify="flex-start" itemsCenter mb={4}>
              <Text category="subhead" status="platinum" marginRight={8}>
                Total balance
              </Text>
              <Icon pack="assets" name="eye_close" style={styles.icon} />
            </HStack>
            <Text category="h2">2,468.00 USD</Text>
          </VStack>
          <Avatar source={Images.finance.finance} />
        </HStack>
        <HStack mt={24} mb={16}>
          <Text category="h6">Your Goal</Text>
          <HStack>
            {TAB.map((item, i) => {
              const isActive = i === selectTab;
              return (
                <TouchableOpacity
                  key={i}
                  activeOpacity={0.7}
                  onPress={() => {
                    setSelectedTab(i);
                  }}
                >
                  <Text
                    category="h6"
                    marginLeft={24}
                    status={isActive ? "primary" : "placeholder"}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </HStack>
        </HStack>
      </>
    );
  };

  return (
    <Container style={styles.container}>
      <TopNavigation
        style={styles.topNavigation}
        accessoryLeft={<Avatar source={Images.avatar.avatar10} />}
        accessoryRight={<NavigationAction icon="bell" status="black" />}
      />
      <FlatList
        contentContainerStyle={styles.content}
        ListHeaderComponent={ListHeaderComp}
        keyExtractor={keyExtractor}
        data={DATA_TAB}
        renderItem={({ item, index }) => {
          const total = _.sumBy(item.members, "contribute");
          const percent = (total / item.target) * 100;
          return (
            <VStack level={`${index + 6}`} border={16} padding={16} mb={8}>
              <HStack mb={16}>
                <Text category="h1">{item.icon}</Text>
                <HStack>
                  {item.members &&
                    item.members.map((person, index) => {
                      return (
                        <Avatar
                          key={index}
                          source={person.avatar}
                          size="small"
                          //@ts-ignore
                          style={styles.avatar}
                        />
                      );
                    })}
                </HStack>
              </HStack>
              <HStack mb={8}>
                <Text category="callout" status="white">
                  {item.title}
                </Text>
                <Text category="h6" status="white">
                  {percent}%
                </Text>
              </HStack>
              <ProgressBar
                progress={percent / 100}
                progressColor={theme["text-white-color"]}
                containColor={`${theme["background-basic-color-1"]}20`}
              />
              <HStack itemsCenter mt={8}>
                <Text status="white" category="h6">
                  {formatDefault(total.toFixed(0))}
                  <Text status="white" opacity={0.8} category="subhead">
                    /{formatDefault(item.target.toFixed(0))}
                  </Text>
                </Text>
                <Text category="subhead" status="white">
                  {item.time_left}
                </Text>
              </HStack>
            </VStack>
          );
        }}
      />
      <VStack ph={16} pv={8}>
        <Button children={"Add More Goal"} onPress={goBack} />
      </VStack>
    </Container>
  );
});

export default Finance11;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  topNavigation: {
    paddingLeft: 20,
  },
  content: {
    paddingTop: 24,
    paddingHorizontal: 16,
  },
  icon: {
    width: 16,
    height: 16,
  },
  header: {
    alignItems: "flex-end",
  },
  avatar: {
    marginLeft: 4,
  },
});
const TAB = ["Live", "Finish"];

const DATA_TAB = [
  {
    icon: "🏠",
    title: "Travel anywhre",
    time_left: "64 days left",
    target: 2000,
    members: [
      {
        id: "1",
        name: "John",
        avatar: Images.avatar.avatar10,
        contribute: 500,
      },
      {
        id: "2",
        name: "Thomas",
        avatar: Images.avatar.avatar02,
        contribute: 500,
      },
      {
        id: "3",
        name: "Jenny",
        avatar: Images.avatar.avatar01,
        contribute: 300,
      },
    ],
  },
  {
    icon: "🚌",
    title: "Travel anywhre",
    time_left: "64 days left",
    target: 2000,
    members: [
      {
        id: "1",
        name: "John",
        avatar: Images.avatar.avatar10,
        contribute: 500,
      },
      {
        id: "2",
        name: "Thomas",
        avatar: Images.avatar.avatar02,
        contribute: 500,
      },
      {
        id: "3",
        name: "Jenny",
        avatar: Images.avatar.avatar01,
        contribute: 300,
      },
    ],
  },
  {
    icon: "🍜",
    title: "Travel anywhre",
    time_left: "64 days left",
    target: 2000,
    members: [
      {
        id: "1",
        name: "John",
        avatar: Images.avatar.avatar10,
        contribute: 500,
      },
      {
        id: "2",
        name: "Thomas",
        avatar: Images.avatar.avatar02,
        contribute: 500,
      },
      {
        id: "3",
        name: "Jenny",
        avatar: Images.avatar.avatar01,
        contribute: 300,
      },
    ],
  },
];
const formatDefault = (amount: string, currency = "$") => {
  let textResult = `${currency}`;
  try {
    if (isNaN(parseFloat(amount))) {
      textResult += numeral(parseFloat(amount.replace(",", ""))).format("0,0");
    } else {
      textResult += numeral(parseFloat(amount)).format("0,0");
    }
  } catch (e) {
    console.log(e);
  }
  return textResult;
};
