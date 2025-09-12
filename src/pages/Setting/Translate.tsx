import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Modal,
  ScrollView,
  Switch,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { themeColors } from '../../themes/colors';
import { BackHeader } from '../../components/BackHeader';

interface TranslateProps {
  navigation: any;
}

interface Language {
  code: string;
  name: string;
  nativeName: string;
}

export const Translate: React.FC<TranslateProps> = ({ navigation }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>({
    code: 'en',
    name: 'English',
    nativeName: '英文',
  });
  const [autoPlay, setAutoPlay] = useState<boolean>(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [selectedVoiceGender, setSelectedVoiceGender] =
    useState<string>('男声');
  const [showLanguageModal, setShowLanguageModal] = useState<boolean>(false);
  const [showVoiceGenderModal, setShowVoiceGenderModal] =
    useState<boolean>(false);

  const languages: Language[] = [
    { code: 'zh', name: 'Chinese', nativeName: '中文' },
    { code: 'en', name: 'English', nativeName: '英文' },
    { code: 'ja', name: 'Japanese', nativeName: '日文' },
    { code: 'ko', name: 'Korean', nativeName: '韩文' },
    { code: 'fr', name: 'French', nativeName: '法文' },
    { code: 'de', name: 'German', nativeName: '德文' },
    { code: 'es', name: 'Spanish', nativeName: '西班牙文' },
  ];

  const voiceGenders = ['男声', '女声'];

  const handleLanguageSelect = (language: Language) => {
    setSelectedLanguage(language);
    setShowLanguageModal(false);
  };

  const handleVoiceGenderSelect = (gender: string) => {
    setSelectedVoiceGender(gender);
    setShowVoiceGenderModal(false);
  };

  const handleSave = () => {
    // 这里保存设置
    console.log('保存翻译设置:', {
      language: selectedLanguage,
      autoPlay,
      playbackSpeed,
      voiceGender: selectedVoiceGender,
    });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={themeColors.background.secondary} barStyle="dark-content" />

      {/* Header */}
      <BackHeader title="翻译设置" />

      {/* Content */}
      <View style={styles.content}>
        {/* 语言选择 */}
        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => setShowLanguageModal(true)}
        >
          <Text style={styles.settingLabel}>语言</Text>
          <View style={styles.settingRight}>
            <Text style={styles.settingValue}>
              {selectedLanguage.nativeName}
            </Text>
            <Text style={styles.arrow}>›</Text>
          </View>
        </TouchableOpacity>

        {/* 自动播放 */}
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>自动播放</Text>
          <Switch
            style={styles.switch}
            value={autoPlay}
            onValueChange={setAutoPlay}
            trackColor={{ false: '#E0E0E0', true: themeColors.primary }}
            thumbColor={autoPlay ? '#FFFFFF' : '#FFFFFF'}
          />
        </View>

        {/* 播放速度 */}
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>播放速度</Text>
          <View style={styles.sliderContainer}>
            <View style={styles.sliderWrapper}>
              <Slider
                style={styles.slider}
                minimumValue={0.5}
                maximumValue={1.25}
                value={playbackSpeed}
                onValueChange={setPlaybackSpeed}
                step={0.25}
                minimumTrackTintColor={themeColors.primary}
                maximumTrackTintColor="#E0E0E0"
                thumbTintColor={themeColors.primary}
              />
            </View>
            <Text style={styles.speedValue}>{playbackSpeed}</Text>
          </View>
        </View>

        {/* 语音性别 */}
        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => setShowVoiceGenderModal(true)}
        >
          <Text style={styles.settingLabel}>语音性别</Text>
          <View style={styles.settingRight}>
            <Text style={styles.settingValue}>{selectedVoiceGender}</Text>
            <Text style={styles.arrow}>›</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* 语言选择模态框 */}
      <Modal
        visible={showLanguageModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowLanguageModal(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowLanguageModal(false)}
        >
          <TouchableOpacity 
            style={styles.modalContent}
            activeOpacity={1}
            onPress={() => {}}
          >
            <ScrollView style={styles.modalList}>
              {languages.map(language => (
                <TouchableOpacity
                  key={language.code}
                  style={styles.modalItem}
                  onPress={() => handleLanguageSelect(language)}
                >
                  <Text
                    style={[
                      styles.modalItemText,
                      selectedLanguage.code === language.code &&
                        styles.modalItemSelected,
                    ]}
                  >
                    {language.nativeName}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      {/* 语音性别选择模态框 */}
      <Modal
        visible={showVoiceGenderModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowVoiceGenderModal(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowVoiceGenderModal(false)}
        >
          <TouchableOpacity 
            style={styles.modalContent}
            activeOpacity={1}
            onPress={() => {}}
          >
            <ScrollView style={styles.modalList}>
              {voiceGenders.map(gender => (
                <TouchableOpacity
                  key={gender}
                  style={styles.modalItem}
                  onPress={() => handleVoiceGenderSelect(gender)}
                >
                  <Text
                    style={[
                      styles.modalItemText,
                      selectedVoiceGender === gender &&
                        styles.modalItemSelected,
                    ]}
                  >
                    {gender}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.background.secondary,
  },
  saveButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  saveButtonText: {
    fontSize: 16,
    color: themeColors.primary,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#F0F0F0',
  },
  settingLabel: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '500',
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingValue: {
    fontSize: 16,
    color: '#666666',
    marginRight: 8,
  },
  arrow: {
    fontSize: 22,
    color: '#888888',
    lineHeight: 24,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: 20,
  },
  sliderWrapper: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  slider: {
    flex: 1,
    height: 30,
  },
  sliderTrack: {
    height: 6,
    borderRadius: 3,
  },
  sliderThumb: {
    backgroundColor: '#FFFFFF',
    width: 28,
    height: 28,
    borderRadius: 14,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  speedValue: {
    fontSize: 16,
    color: '#666666',
    marginLeft: 12,
    minWidth: 30,
    textAlign: 'right',
  },
  switch: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
    alignSelf: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  modalCloseButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  modalCloseText: {
    fontSize: 16,
    color: themeColors.primary,
    fontWeight: '500',
  },
  modalList: {
    maxHeight: 400,
  },
  modalItem: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#F0F0F0',
    alignItems: 'center',
  },
  modalItemText: {
    fontSize: 16,
    color: '#333333',
    textAlign: 'center',
  },
  modalItemSelected: {
    color: themeColors.primary,
    fontWeight: '500',
  },
});

export default Translate;
