import { MEDIA_REGISTRY } from '../../assets/mediaRegistry';
import type { GallerySectionCopy } from '../galleryTranslations';

export const jaGallery: GallerySectionCopy = {
  kicker: '公式スクリーンショット · Google Play ＆ App Store（近日公開）',
  heading: '実際のアプリ画面と機能ガイド。',
  subheading:
    'ダークモード・ライトモードの切り替え、カスタムキャンバス＆OCR搭載ノート、スマートカレンダー＆アラーム、貯蓄・収支グラフ分析、Googleドライブバックアップまで実際の画面でご確認ください。',
  zoomHint: '画面を拡大',
  closePreview: 'プレビューを閉じる',
  prevScreen: '前へ',
  nextScreen: '次へ',
  heroDarkBtn: 'ダークモード',
  heroLightBtn: 'ライトモード',
  items: [
    {
      id: 'dark-mode',
      src: MEDIA_REGISTRY.darkModeScreen,
      badge: '01 · ダークモード',
      title: '象徴的な Midnight-Blue ダークモードホーム',
      subtitle:
        'ノート、日次、週次、月次、チェックリスト、貯蓄、支出、カレンダー、電卓、アラームを1つの統合ホーム画面からスマートに管理できます。',
      bullets: [
        '高精度アラームを含む10個の統合ワークスペースモジュール',
        '「すべて・生産性・家計」のワンタップ高速フィルター',
        '昼夜を問わず目に優しく集中しやすい配色設計',
      ],
    },
    {
      id: 'light-mode',
      src: MEDIA_REGISTRY.lightModeScreen,
      badge: '02 · ライトモード',
      title: '鮮明で見やすいクリーンライトモード',
      subtitle:
        '画面上部のテーマアイコンを1回タップするだけで、ダークモードとライトモードを瞬時に切り替えられます。',
      bullets: [
        '色分けされたカテゴリーアイコンによる明快なカードレイアウト',
        '設定画面やアプリロック機能への素早いアクセス',
        'オフラインでもオンラインでも軽快に起動・動作',
      ],
    },
    {
      id: 'versatile-notebook',
      src: MEDIA_REGISTRY.versatileNotebookScreen,
      badge: '03 · 多機能ノート',
      title: '無制限ノート・カスタムキャンバス＆OCRスキャン',
      subtitle:
        'カスタムキャンバス、背景色やJPG背景画像の設定、写真挿入、さらにオフライン／オンライン対応のカメラOCR文字認識を備えています。',
      bullets: [
        '自由な背景カラー選択とカスタムJPG背景画像のサポート',
        '充実の書式ツールバー（フォント・太字・下線・コード・リンク等）',
        'フォルダ整理とキーワードによる瞬時の検索機能',
      ],
    },
    {
      id: 'plans-calendar',
      src: MEDIA_REGISTRY.plansCalendarScreen,
      badge: '04 · 予定＆カレンダー',
      title: 'プランナー・スマートカレンダー＆アラーム通知',
      subtitle:
        '日次・週次・月次ノートの作成、スマートカレンダーでの予定登録、カスタム着信音付きアラームでスケジュールを確実に管理します。',
      bullets: [
        '整理された日次・週次・月次ノート専用フォルダ',
        'エクスポート対応のカラフルなチェックリスト',
        'スマートカレンダーとお好みのMP3着信音アラーム連携',
      ],
    },
    {
      id: 'financial-goals',
      src: MEDIA_REGISTRY.financialGoalsScreen,
      badge: '05 · 家計＆貯蓄目標',
      title: '目標達成をサポート：貯蓄＆支出トラッカー',
      subtitle:
        '毎日のキャッシュフローを記録し、インタラクティブなグラフ分析で夢に向けた貯蓄の進捗を楽しく管理できます。',
      bullets: [
        '貯蓄目標の設定、請求管理、便利なミニ電卓を内蔵',
        'ドーナツ円グラフ・棒グラフ・折れ線グラフによる収支分析',
        '取引履歴の確認と PDF・Excel へのレポート出力',
      ],
    },
    {
      id: 'privacy-backup',
      src: MEDIA_REGISTRY.privacyBackupScreen,
      badge: '06 · プライバシー保護',
      title: '端末内データ保護＆Google ドライブバックアップ',
      subtitle:
        '個人のノートや家計記録は端末内に安全に保存され、オンライン時には個人の Google ドライブへ直接バックアップ・復元できます。',
      bullets: [
        'オンライン接続時に個人の Google ドライブへ直接バックアップ＆復元',
        '6桁PIN・パターン・生体認証による多層アプリロック',
        '端末内データとクラウドバックアップをユーザー自身で管理',
      ],
    },
  ],
};
