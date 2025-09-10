import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  FlatList,
  Image,
} from 'react-native';
import { themeColors } from '../../themes/colors';

interface RelationProps {
  navigation: any;
}

interface Friend {
  id: string;
  name: string;
  avatar: string;
  isOnline?: boolean;
}

interface ContactItem {
  id: string;
  title: string;
  icon: string;
  iconColor: string;
  type: 'category' | 'friend';
  friend?: Friend;
}

export const Relation: React.FC<RelationProps> = ({
  navigation: _navigation,
}) => {
  const [friends] = useState<Friend[]>([
    {
      id: '1',
      name: '洪权',
      avatar: 'https://via.placeholder.com/50x50/4A90E2/FFFFFF?text=HQ',
      isOnline: true,
    },
    {
      id: '2',
      name: '空气小猪',
      avatar: 'https://via.placeholder.com/50x50/FF6B6B/FFFFFF?text=🐷',
      isOnline: false,
    },
  ]);

  const contactItems: ContactItem[] = [
    {
      id: 'new_friends',
      title: '新的朋友',
      icon: '👤',
      iconColor: '#FF9500',
      type: 'category',
    },
    {
      id: 'group_chat',
      title: '群聊',
      icon: '👥',
      iconColor: '#8E44AD',
      type: 'category',
    },
    {
      id: 'blacklist',
      title: '黑名单',
      icon: '🚫',
      iconColor: '#3498DB',
      type: 'category',
    },
  ];

  const handleContactPress = (item: ContactItem) => {
    switch (item.id) {
      case 'new_friends':
        console.log('跳转到新的朋友页面');
        // navigation.navigate('NewFriends');
        break;
      case 'group_chat':
        console.log('跳转到群聊页面');
        // navigation.navigate('GroupChat');
        break;
      case 'blacklist':
        console.log('跳转到黑名单页面');
        // navigation.navigate('Blacklist');
        break;
      default:
        if (item.friend) {
          console.log('跳转到好友详情页面:', item.friend.name);
          // navigation.navigate('FriendDetail', { friend: item.friend });
        }
        break;
    }
  };

  const handleAddFriend = () => {
    console.log('跳转到添加好友页面');
    // navigation.navigate('AddFriend');
  };

  const renderContactItem = ({ item }: { item: ContactItem }) => (
    <TouchableOpacity
      style={styles.contactItem}
      onPress={() => handleContactPress(item)}
    >
      <View style={styles.contactLeft}>
        {item.type === 'category' ? (
          <View
            style={[styles.categoryIcon, { backgroundColor: item.iconColor }]}
          >
            <Text style={styles.categoryIconText}>{item.icon}</Text>
          </View>
        ) : (
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: item.friend?.avatar }}
              style={styles.avatar}
            />
            {item.friend?.isOnline && <View style={styles.onlineIndicator} />}
          </View>
        )}
        <Text style={styles.contactTitle}>{item.title}</Text>
      </View>
      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );

  const renderSectionHeader = () => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>我的好友</Text>
    </View>
  );

  const ItemSeparator = () => <View style={styles.separator} />;

  const allItems: ContactItem[] = [
    ...contactItems,
    ...friends.map(friend => ({
      id: friend.id,
      title: friend.name,
      icon: '',
      iconColor: '',
      type: 'friend' as const,
      friend,
    })),
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="transparent" translucent />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>通讯录</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAddFriend}>
          <Text style={styles.addButtonIcon}>👤+</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <FlatList
          data={allItems}
          renderItem={renderContactItem}
          keyExtractor={item => item.id}
          ListHeaderComponent={renderSectionHeader}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={ItemSeparator}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  addButton: {
    padding: 8,
  },
  addButtonIcon: {
    fontSize: 20,
    color: themeColors.primary,
  },
  content: {
    flex: 1,
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F8F8F8',
  },
  sectionTitle: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  contactItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  contactLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  categoryIconText: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  contactTitle: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '500',
  },
  arrow: {
    fontSize: 18,
    color: '#CCCCCC',
  },
  separator: {
    height: 0.5,
    backgroundColor: '#F0F0F0',
    marginLeft: 68,
  },
});

export default Relation;
