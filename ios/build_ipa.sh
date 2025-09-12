#!/bin/bash

# iOS IPA 打包脚本
# 使用方法: ./build_ipa.sh

set -e

echo "🚀 开始打包 iOS IPA 文件..."

# 设置变量
SCHEME="Airpiggy"
WORKSPACE="Airpiggy.xcworkspace"
CONFIGURATION="Release"
EXPORT_OPTIONS="exportOptions.plist"
ARCHIVE_PATH="build/Airpiggy.xcarchive"
EXPORT_PATH="build/Export"

# 清理之前的构建
echo "🧹 清理之前的构建..."
rm -rf build/
rm -rf ~/Library/Developer/Xcode/DerivedData/Airpiggy-*

# 安装 CocoaPods 依赖
echo "📦 安装 CocoaPods 依赖..."
cd ios
pod install --repo-update

# 构建 Archive
echo "🔨 构建 Archive..."
xcodebuild archive \
  -workspace $WORKSPACE \
  -scheme $SCHEME \
  -configuration $CONFIGURATION \
  -archivePath $ARCHIVE_PATH \
  -allowProvisioningUpdates \
  -destination "generic/platform=iOS"

# 导出 IPA
echo "📤 导出 IPA..."
xcodebuild -exportArchive \
  -archivePath $ARCHIVE_PATH \
  -exportPath $EXPORT_PATH \
  -exportOptionsPlist $EXPORT_OPTIONS \
  -allowProvisioningUpdates

# 检查 IPA 文件
if [ -f "$EXPORT_PATH/Airpiggy.ipa" ]; then
    echo "✅ IPA 文件创建成功!"
    echo "📁 文件位置: $EXPORT_PATH/Airpiggy.ipa"
    echo "📊 文件大小: $(du -h $EXPORT_PATH/Airpiggy.ipa | cut -f1)"
else
    echo "❌ IPA 文件创建失败!"
    exit 1
fi

echo "🎉 打包完成!"
