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

interface ModeModalProps {
  visible: boolean;
  onClose: () => void;
  currentMode: string;
  onModeChange: (mode: string) => void;
}

const { width: screenWidth } = Dimensions.get('window');

export const ModeModal: React.FC<ModeModalProps> = ({
  visible,
  onClose,
  currentMode,
  onModeChange,
}) => {
  const modes = [
    { key: 'foreign', label: '外语模式' },
    { key: 'normal', label: '普通模式' },
  ];

  const handleModeSelect = (mode: string) => {
    onModeChange(mode);
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
              <Text style={styles.title}>模式</Text>
            </View>
            
            {/* 模式选项 */}
            <View style={styles.content}>
              {modes.map((mode, index) => (
                <TouchableOpacity
                  key={mode.key}
                  style={[
                    styles.modeItem,
                    index === modes.length - 1 && styles.lastItem
                  ]}
                  onPress={() => handleModeSelect(mode.key)}
                >
                  <Text style={styles.modeLabel}>{mode.label}</Text>
                  {currentMode === mode.key && (
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
  modeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E5E5',
  },
  modeLabel: {
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
