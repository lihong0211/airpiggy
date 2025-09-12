import React, { useEffect, useState } from 'react';
import { Image, type ImageSourcePropType, StyleSheet } from 'react-native';
import {
  useIsFocused,
  type ParamListBase,
  type RouteProp,
} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TUIChatEngine, {
  IConversationModel,
  StoreName,
  TUIStore,
} from '@tencentcloud/chat-uikit-engine';

import { ConversationListScreen } from '../UIKitScreen';
import { SettingNavigator } from '../Setting/SettingNavigator';
import { Relation } from '../Relation';
import { themeColors } from '../../themes/colors';

interface ITabBar {
  default: ImageSourcePropType;
  focused: ImageSourcePropType;
}

interface IScreenOptionsProps {
  route: RouteProp<ParamListBase>;
}

interface ITabBarIconProps {
  focused: boolean;
}

export const Home = () => {
  const Tab = createBottomTabNavigator();
  const isFocused = useIsFocused();

  const menuList: Record<string, ITabBar> = {
    Message: {
      default: require('../../static/logo.png'),
      focused: require('../../static/logo_active.png'),
    },
    Contacts: {
      default: require('../../static/relation.png'),
      focused: require('../../static/relation-selected.png'),
    },
    Profile: {
      default: require('../../static/profile.png'),
      focused: require('../../static/profile-selected.png'),
    },
  };

  const [messageOptions, setMessageOptions] = useState<Record<string, any>>({});
  const [isPageShow, setIsPageShow] = useState<boolean>(true);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [markCount, setMarkCount] = useState<number>(0);

  const onTotalUnreadCount = (value: number) => {
    console.log('📬 未读消息数量更新:', value);
    setUnreadCount(value);
  };

  const onConversationListUpdated = (list: IConversationModel[]) => {
    const _markCount: number = list.reduce(
      (accumulator: number, currentValue: IConversationModel) => {
        const markUnRead = currentValue.markList.some(
          item => item === TUIChatEngine.TYPES.CONV_MARK_TYPE_UNREAD,
        );
        if (markUnRead && !currentValue.isMuted) {
          return accumulator + 1;
        }
        return accumulator + 0;
      },
      0,
    );
    setMarkCount(_markCount);
  };

  useEffect(() => {
    console.log('🔄 更新消息徽章:', { unreadCount, markCount });

    const _messageOptions: Record<string, any> = {};
    const value = unreadCount + markCount;
    if (value > 0) {
      _messageOptions.tabBarBadge = `${value > 99 ? '99+' : value}`;
    }
    setMessageOptions(_messageOptions);
  }, [unreadCount, markCount]);

  useEffect(() => {
    TUIStore.watch(StoreName.CONV, {
      totalUnreadCount: onTotalUnreadCount,
      conversationList: onConversationListUpdated,
    });
    return () => {
      TUIStore.unwatch(StoreName.CONV, {
        totalUnreadCount: onTotalUnreadCount,
      });
    };
  }, []);

  useEffect(() => {
    setIsPageShow(isFocused);
  }, [isFocused]);

  const screenOptions = ({ route }: IScreenOptionsProps) => {
    const tabBarIcon = ({ focused }: ITabBarIconProps) => {
      const menuItem = menuList[route.name];
      if (!menuItem) {
        console.warn(`No menu configuration found for route: ${route.name}`);
        return null;
      }
      const icon = focused ? menuItem.focused : menuItem.default;
      return <Image source={icon} style={styles.icon} />;
    };
    return {
      tabBarIcon,
      headerShown: false,
      tabBarActiveTintColor: themeColors.primary,
      tabBarInactiveTintColor: themeColors.text.disabled,
      tabBarStyle: styles.tabBarStyle,
      tabBarItemStyle: styles.tabBarItemStyle,
      tabBarLabelStyle: styles.tabBarLabelStyle,
      tabBarBadgeStyle: styles.tabBarBadgeStyle,
      animationEnabled: false,
      swipeEnabled: true,
    };
  };

  return (
    isPageShow && (
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen
          name="Message"
          component={ConversationListScreen}
          options={{
            title: '消息',
            ...messageOptions,
          }}
        />
        <Tab.Screen
          name="Contacts"
          component={Relation}
          options={{
            title: '通讯录',
          }}
        />
        <Tab.Screen
          name="Profile"
          component={SettingNavigator}
          options={{
            title: '我的',
          }}
        />
      </Tab.Navigator>
    )
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
  tabBarStyle: {
    paddingTop: 8,
    paddingBottom: 8,
    height: 60,
    backgroundColor: themeColors.background.disabled,
    borderTopWidth: 0,
  },
  tabBarItemStyle: {
    gap: 3,
  },
  tabBarLabelStyle: {
    fontSize: 10,
    fontWeight: '500',
    lineHeight: 14,
  },
  tabBarBadgeStyle: {
    top: -4,
  },
});
