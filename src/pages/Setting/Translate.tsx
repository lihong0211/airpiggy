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
      <StatusBar backgroundColor="transparent" translucent />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← 返回</Text>
        </TouchableOpacity>
        <Text style={styles.title}>翻译设置</Text>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>保存</Text>
        </TouchableOpacity>
      </View>

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
            <Slider
              style={styles.slider}
              minimumValue={0.5}
              maximumValue={2.0}
              value={playbackSpeed}
              onValueChange={setPlaybackSpeed}
              step={0.1}
              minimumTrackTintColor={themeColors.primary}
              maximumTrackTintColor="#E0E0E0"
              thumbStyle={styles.sliderThumb}
            />
            <Text style={styles.speedValue}>{playbackSpeed.toFixed(1)}</Text>
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
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>选择语言</Text>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setShowLanguageModal(false)}
              >
                <Text style={styles.modalCloseText}>完成</Text>
              </TouchableOpacity>
            </View>
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
          </View>
        </View>
      </Modal>

      {/* 语音性别选择模态框 */}
      <Modal
        visible={showVoiceGenderModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowVoiceGenderModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>选择语音性别</Text>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setShowVoiceGenderModal(false)}
              >
                <Text style={styles.modalCloseText}>完成</Text>
              </TouchableOpacity>
            </View>
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
          </View>
        </View>
      </Modal>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    marginRight: 16,
  },
  backButtonText: {
    fontSize: 16,
    color: themeColors.primary,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
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
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
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
  },
  settingValue: {
    fontSize: 16,
    color: '#666666',
    marginRight: 8,
  },
  arrow: {
    fontSize: 18,
    color: '#CCCCCC',
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: 20,
  },
  slider: {
    flex: 1,
    height: 40,
  },
  sliderThumb: {
    backgroundColor: themeColors.primary,
    width: 20,
    height: 20,
  },
  speedValue: {
    fontSize: 16,
    color: '#666666',
    marginLeft: 12,
    minWidth: 30,
    textAlign: 'right',
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
  },
  modalItemText: {
    fontSize: 16,
    color: '#333333',
  },
  modalItemSelected: {
    color: themeColors.primary,
    fontWeight: '500',
  },
});

export default Translate;
