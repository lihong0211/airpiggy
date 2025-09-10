import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

interface ToastProps {
  message: string;
  duration?: number; // 延迟关闭时间，默认2500ms
  visible: boolean;
  onHide: () => void;
}

interface ToastOptions {
  msg: string;
  duration?: number;
}

const { width: screenWidth } = Dimensions.get('window');

// Toast组件
const Toast: React.FC<ToastProps> = ({
  message,
  duration = 2500,
  visible,
  onHide,
}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (visible) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        // 延迟执行onHide，让动画完成
        setTimeout(onHide, 300);
      }, duration);

      return () => clearTimeout(timer);
    } else {
      setShow(false);
    }
  }, [visible, duration, onHide]);

  if (!show) {
    return null;
  }

  return (
    <View style={styles.overlay}>
      <View style={styles.toastContainer}>
        <Text style={styles.toastText}>{message}</Text>
      </View>
    </View>
  );
};

// Toast管理器
class ToastManager {
  private static instance: ToastManager;
  private toastRef: React.RefObject<any> | null = null;

  static getInstance(): ToastManager {
    if (!ToastManager.instance) {
      ToastManager.instance = new ToastManager();
    }
    return ToastManager.instance;
  }

  setRef(ref: React.RefObject<any>) {
    this.toastRef = ref;
  }

  show(options: ToastOptions) {
    if (this.toastRef?.current) {
      this.toastRef.current.show(options.msg, options.duration || 2500);
    }
  }
}

// 全局Toast函数
export const showToastMessage = (options: ToastOptions) => {
  ToastManager.getInstance().show(options);
};

// Toast容器组件
export const ToastContainer: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [duration, setDuration] = useState(2500);

  useEffect(() => {
    const manager = ToastManager.getInstance();
    manager.setRef({
      current: {
        show: (msg: string, dur: number) => {
          setMessage(msg);
          setDuration(dur);
          setVisible(true);
        },
      },
    });
  }, []);

  const handleHide = () => {
    setVisible(false);
  };

  return (
    <Toast
      message={message}
      duration={duration}
      visible={visible}
      onHide={handleHide}
    />
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    pointerEvents: 'none', // 允许点击穿透
  },
  toastContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: screenWidth * 0.4, // 最小宽度为页面2/5
    maxWidth: screenWidth * 0.8, // 最大宽度为页面4/5
    marginHorizontal: 20,
  },
  toastText: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export { Toast };
