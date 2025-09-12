import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
  Image,
} from 'react-native';
import { themeColors } from '../../themes/colors';

const selectedIcon = require('../../static/selected.png');

interface FriendModalProps {
  visible: boolean;
  onClose: () => void;
  currentSetting: string;
  onSettingChange: (setting: string) => void;
}

const { width: screenWidth } = Dimensions.get('window');

export const FriendModal: React.FC<FriendModalProps> = ({
  visible,
  onClose,
  currentSetting,
  onSettingChange,
}) => {
  const friendSettings = [
    { key: 'accept_all', label: '同意任何用户加好友' },
    { key: 'need_verify', label: '需要验证' },
    { key: 'reject_all', label: '拒绝任何人加好友' },
  ];

  const handleSettingSelect = (setting: string) => {
    onSettingChange(setting);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity activeOpacity={1} style={styles.modal}>
            {/* 标题 */}
            <View style={styles.header}>
              <Text style={styles.title}>加我为好友时</Text>
            </View>
            
            {/* 设置选项 */}
            <View style={styles.content}>
              {friendSettings.map((setting, index) => (
                <TouchableOpacity
                  key={setting.key}
                  style={[
                    styles.settingItem,
                    index === friendSettings.length - 1 && styles.lastItem
                  ]}
                  onPress={() => handleSettingSelect(setting.key)}
                >
                  <Text style={styles.settingLabel}>{setting.label}</Text>
                  {currentSetting === setting.key && (
                    <Image source={selectedIcon} style={styles.checkmark} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 34, // 为底部安全区域留出空间
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  content: {
    paddingHorizontal: 24,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E5E5',
  },
  settingLabel: {
    fontSize: 16,
    color: '#333333',
    flex: 1,
  },
  checkmark: {
    width: 16,
    height: 16,
  },
  lastItem: {
    borderBottomWidth: 0,
  },
});
