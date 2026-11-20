import type { Lang } from "./i18n/types";

/**
 * One line under each screen in a case study, so a reader knows what they are looking at.
 * Keyed by the folder in `src/assets/cases/` and the file name without its extension; the
 * order inside each tuple follows LANG_ORDER. A screen without an entry simply shows none.
 *
 * Lives outside the language files because it only matters once a case study is open, and
 * importing it from CaseStudy keeps it in that lazily loaded chunk.
 */
const LANG_ORDER: Lang[] = ["en", "pt", "es", "de", "ja", "ko", "zh"];
type Line = [string, string, string, string, string, string, string];

const captions: Record<string, Record<string, Line>> = {
  "meu-chamado": {
    loop: ["A ticket from opening to resolution", "Um chamado da abertura à solução", "Un ticket de la apertura a la solución", "Ein Ticket von der Eröffnung bis zur Lösung", "チケットの起票から解決まで", "티켓 접수부터 해결까지", "工单从创建到解决"],
    "01-landing": ["The landing page", "A landing page", "La landing page", "Die Landingpage", "ランディングページ", "랜딩 페이지", "落地页"],
    "02-funcionalidades": ["Landing: a single queue and deadlines by priority", "Landing: fila única e prazo por prioridade", "Landing: cola única y plazos por prioridad", "Landingpage: eine Warteschlange und Fristen nach Priorität", "ランディング：単一のキューと優先度別の期限", "랜딩: 하나의 대기열과 우선순위별 기한", "落地页：统一队列与按优先级的时限"],
    "03-caminho": ["Landing: a ticket's path, from request to confirmation", "Landing: o caminho do chamado, do pedido à confirmação", "Landing: el camino del ticket, de la solicitud a la confirmación", "Landingpage: der Weg eines Tickets von der Anfrage bis zur Bestätigung", "ランディング：依頼から確認までのチケットの流れ", "랜딩: 요청부터 확인까지 티켓의 흐름", "落地页：工单从提出到确认的流程"],
    "04-painel": ["Dashboard with the day's queue", "Painel com a fila do dia", "Panel con la cola del día", "Dashboard mit der Tageswarteschlange", "当日のキューを表示するダッシュボード", "오늘의 대기열을 보여 주는 대시보드", "显示当日队列的仪表盘"],
    "05-fila": ["Ticket queue with filters", "Fila de chamados com filtros", "Cola de tickets con filtros", "Ticket-Warteschlange mit Filtern", "フィルター付きのチケット一覧", "필터가 있는 티켓 대기열", "带筛选的工单队列"],
    "06-detalhe": ["Ticket detail and history", "Detalhe e histórico do chamado", "Detalle e historial del ticket", "Ticketdetails und Verlauf", "チケットの詳細と履歴", "티켓 상세와 이력", "工单详情与历史"],
    "07-sla": ["SLA by priority", "SLA por prioridade", "SLA por prioridad", "SLA nach Priorität", "優先度別のSLA", "우선순위별 SLA", "按优先级的 SLA"],
    "08-relatorios": ["Reports", "Relatórios", "Informes", "Berichte", "レポート", "리포트", "报表"],
    "09-m-landing": ["The landing page on a phone", "A landing page no celular", "La landing page en el móvil", "Die Landingpage auf dem Handy", "スマートフォンで見るランディングページ", "휴대폰에서 보는 랜딩 페이지", "手机上的落地页"],
    "10-m-funcionalidades": ["Features on a phone", "Funcionalidades no celular", "Funcionalidades en el móvil", "Funktionen auf dem Handy", "スマートフォンで見る機能", "휴대폰에서 보는 기능", "手机上的功能介绍"],
    "11-m-papeis": ["Three roles, one system", "Três papéis, um sistema só", "Tres roles, un solo sistema", "Drei Rollen, ein System", "3つの役割、ひとつのシステム", "세 가지 역할, 하나의 시스템", "三种角色，一个系统"],
    "12-m-seguranca": ["Access controlled by organization and role", "Acesso controlado por organização e perfil", "Acceso controlado por organización y perfil", "Zugriff nach Organisation und Rolle", "組織とロールによるアクセス制御", "조직과 역할별 접근 제어", "按组织和角色控制访问"],
  },
  motor: {
    "01-inicio": ["Home: balance, Pix limit and recent activity", "Início: saldo, limite Pix e movimentações", "Inicio: saldo, límite Pix y movimientos", "Start: Saldo, Pix-Limit und Umsätze", "ホーム：残高、Pix限度額、最近の取引", "홈: 잔액, Pix 한도, 최근 거래", "首页：余额、Pix 限额与近期交易"],
    "02-pix-valor": ["Amount above the Pix limit, refused before sending", "Valor acima do limite Pix, recusado antes de enviar", "Importe por encima del límite Pix, rechazado antes de enviar", "Betrag über dem Pix-Limit, vor dem Senden abgelehnt", "Pix限度額を超える金額は送信前に拒否", "Pix 한도를 넘는 금액은 보내기 전에 거절", "超出 Pix 限额的金额在发送前被拒绝"],
    "03-pix-outro-banco": ["Pix to another bank, pending while the saga runs", "Pix para outro banco, pendente enquanto a saga roda", "Pix a otro banco, pendiente mientras corre la saga", "Pix an eine andere Bank, ausstehend während der Saga", "他行へのPix。サーガ実行中は保留", "타행 Pix, 사가가 도는 동안 대기", "跨行 Pix，在 Saga 执行期间处于待处理"],
    "04-idempotencia": ["Same request sent twice, one debit", "Mesma requisição enviada duas vezes, um débito só", "La misma petición enviada dos veces, un solo débito", "Dieselbe Anfrage zweimal, nur eine Abbuchung", "同じリクエストを2回送っても引き落としは1回", "같은 요청을 두 번 보내도 출금은 한 번", "同一请求发送两次，只扣款一次"],
    "05-extrato": ["Statement and receipt", "Extrato e comprovante", "Extracto y comprobante", "Kontoauszug und Beleg", "明細と控え", "거래 내역과 영수증", "账单与回执"],
    "06-kafka": ["Transfer events on Kafka", "Eventos de transferência no Kafka", "Eventos de transferencia en Kafka", "Überweisungsevents in Kafka", "Kafka上の送金イベント", "Kafka의 송금 이벤트", "Kafka 上的转账事件"],
    "07-escuro": ["Dark theme", "Tema escuro", "Tema oscuro", "Dunkles Theme", "ダークテーマ", "다크 테마", "深色主题"],
  },
  vesta: {
    "01-landing": ["Landing page: the 14-day trial up front", "Landing page: o teste de 14 dias logo na primeira dobra", "Landing page: la prueba de 14 días al frente", "Landingpage: der 14-Tage-Test ganz oben", "ランディングページ：14日間の無料トライアルを最初に", "랜딩 페이지: 14일 무료 체험을 맨 앞에", "落地页：首屏即是 14 天试用"],
    "02-como": ["How it works, from table to kitchen", "Como funciona, da mesa à cozinha", "Cómo funciona, de la mesa a la cocina", "So funktioniert es, vom Tisch in die Küche", "仕組み：テーブルからキッチンまで", "작동 방식: 테이블에서 주방까지", "运作方式：从餐桌到厨房"],
    "03-recursos": ["Features for the floor, kitchen, till and stock", "Recursos para salão, cozinha, caixa e estoque", "Funciones para sala, cocina, caja y stock", "Funktionen für Service, Küche, Kasse und Lager", "ホール、キッチン、レジ、在庫のための機能", "홀, 주방, 계산대, 재고를 위한 기능", "覆盖前厅、厨房、收银与库存的功能"],
    "04-contato": ["Trial sign-up and a direct line to sales", "Cadastro do teste e contato direto com o comercial", "Registro de prueba y contacto directo con ventas", "Testanmeldung und direkter Draht zum Vertrieb", "トライアル登録と営業への直接連絡", "체험 신청과 영업팀 직접 연결", "试用注册与直达销售的联系方式"],
  },

  ninho: {
    "01-landing": ["The landing page", "A landing page", "La landing page", "Die Landingpage", "ランディングページ", "랜딩 페이지", "落地页"],
    "02-landing-escuro": ["The landing page in the dark theme", "A landing page no tema escuro", "La landing page en tema oscuro", "Die Landingpage im dunklen Theme", "ダークテーマのランディングページ", "다크 테마의 랜딩 페이지", "深色主题的落地页"],
    "03-visao-geral": ["Web app: the month at a glance", "App web: o mês num relance", "App web: el mes de un vistazo", "Web-App: der Monat auf einen Blick", "ウェブアプリ：ひと目でわかる今月", "웹 앱: 한눈에 보는 이번 달", "Web 应用：本月一览"],
    "04-financas": ["Family finances: income, bills and debts", "Finanças da família: receitas, contas e dívidas", "Finanzas de la familia: ingresos, cuentas y deudas", "Familienfinanzen: Einnahmen, Rechnungen und Schulden", "家族の家計：収入、請求、借入", "가족 재정: 수입, 청구서, 부채", "家庭财务：收入、账单与债务"],
    "05-enxoval": ["Layette goals with what is still missing", "Metas do enxoval com o que ainda falta", "Metas del ajuar con lo que aún falta", "Ziele für die Erstausstattung mit dem, was noch fehlt", "出産準備品の目標と不足分", "출산 준비물 목표와 남은 금액", "婴儿用品目标与尚缺部分"],
    "06-saude": ["Health appointments", "Compromissos de saúde", "Citas de salud", "Gesundheitstermine", "健康の予定", "건강 일정", "健康预约"],
    "07-escuro": ["The web app in the dark theme", "O app web no tema escuro", "La app web en tema oscuro", "Die Web-App im dunklen Theme", "ダークテーマのウェブアプリ", "다크 테마의 웹 앱", "深色主题的 Web 应用"],
    "08-m-visao-geral": ["Android app: overview", "App Android: visão geral", "App Android: resumen", "Android-App: Übersicht", "Androidアプリ：概要", "Android 앱: 개요", "Android 应用：概览"],
    "09-m-financas": ["Android app: finances", "App Android: finanças", "App Android: finanzas", "Android-App: Finanzen", "Androidアプリ：家計", "Android 앱: 재정", "Android 应用：财务"],
    "10-m-bebe": ["Android app: the baby's growth", "App Android: o crescimento do bebê", "App Android: el crecimiento del bebé", "Android-App: das Wachstum des Babys", "Androidアプリ：赤ちゃんの成長", "Android 앱: 아기의 성장", "Android 应用：宝宝的成长"],
    "11-m-escuro": ["Android app in the dark theme", "App Android no tema escuro", "App Android en tema oscuro", "Android-App im dunklen Theme", "ダークテーマのAndroidアプリ", "다크 테마의 Android 앱", "深色主题的 Android 应用"],
  },
  cutucanois: {
    loop: ["A mood animation playing", "Uma animação de humor", "Una animación de humor", "Eine Stimmungsanimation", "気分アニメーション", "기분 애니메이션", "心情动画"],
    "01-casa": ["The avatar's room", "O quarto do avatar", "La habitación del avatar", "Das Zimmer des Avatars", "アバターの部屋", "아바타의 방", "头像的房间"],
    "02-aparencia": ["Appearance editor", "Editor de aparência", "Editor de apariencia", "Aussehen-Editor", "外見エディター", "외모 편집기", "外观编辑器"],
    "03-humor": ["Moods", "Humores", "Humores", "Stimmungen", "気分", "기분", "心情"],
    "04-cutucar": ["Sending a poke", "Enviando uma cutucada", "Enviando un toque", "Einen Anstupser senden", "つつきを送る", "콕 찌르기 보내기", "发送戳一戳"],
  },
  argus: {
    "01-visao-geral": ["Overview with the store's flow", "Visão geral com o fluxo da ótica", "Resumen con el flujo de la óptica", "Übersicht mit dem Ablauf des Geschäfts", "店舗の流れが分かる概要画面", "매장 흐름을 보여 주는 개요", "显示门店流程的概览"],
    "02-laboratorio": ["Lab orders by stage", "Ordens do laboratório por etapa", "Órdenes del laboratorio por etapa", "Werkstattaufträge nach Stufe", "工程別のラボ作業指示", "단계별 가공실 작업 지시", "按阶段划分的加工工单"],
    "03-pdv": ["Point of sale", "PDV", "Punto de venta", "Kasse", "POS", "POS", "收银台"],
    "04-financeiro": ["Finance: payables and receivables", "Financeiro: contas a pagar e a receber", "Finanzas: cuentas por pagar y cobrar", "Finanzen: Verbindlichkeiten und Forderungen", "財務：支払と入金", "재무: 지급과 수금", "财务：应付与应收"],
    "05-estoque": ["Stock with entries and counts", "Estoque com entradas e contagens", "Stock con entradas y recuentos", "Lager mit Zugängen und Inventur", "入庫と棚卸のある在庫", "입고와 실사가 있는 재고", "含入库与盘点的库存"],
    "06-pacientes": ["Patients and dependants", "Pacientes e dependentes", "Pacientes y dependientes", "Patienten und Angehörige", "患者と家族", "환자와 가족", "顾客及其家属"],
  },
  soluna: {
    "01-vila": ["Vigil of Soluna: the village, merchant and shrine", "Vigília de Soluna: a vila, o mercador e o santuário", "Vigilia de Soluna: la aldea, el mercader y el santuario", "Wacht von Soluna: Dorf, Händler und Schrein", "ソルナの見張り：村、商人、祠", "솔루나의 파수: 마을, 상인, 성소", "索露娜守望：村庄、商人与神龛"],
    "02-bosque": ["Forest of the Forgotten: exploration, creatures and gathering spots", "Bosque dos Esquecidos: exploração, criaturas e pontos de coleta", "Bosque de los Olvidados: exploración, criaturas y puntos de recolección", "Wald der Vergessenen: Erkundung, Kreaturen und Sammelstellen", "忘れられた森：探索、クリーチャー、採集ポイント", "잊힌 자들의 숲: 탐험, 크리처, 채집 지점", "遗忘之林：探索、生物与采集点"],
    "03-editor-mapa": ["Map editor (F1): painting tiles with the game running", "Editor de mapas (F1): pintando tiles com o jogo rodando", "Editor de mapas (F1): pintando tiles con el juego en marcha", "Karteneditor (F1): Tiles malen, während das Spiel läuft", "マップエディタ（F1）：ゲーム実行中にタイルを配置", "맵 에디터(F1): 게임 실행 중 타일 칠하기", "地图编辑器（F1）：游戏运行中绘制图块"],
    "04-editor-cenario": ["Map editor: placing scenery pieces with collision", "Editor de mapas: colocando peças de cenário com colisão", "Editor de mapas: colocando piezas de escenario con colisión", "Karteneditor: Kulissenteile mit Kollision setzen", "マップエディタ：当たり判定付きの背景パーツを配置", "맵 에디터: 충돌이 있는 배경 조각 배치", "地图编辑器：放置带碰撞的场景部件"],
    "05-estalagem": ["The inn, reached through a door in the village", "A estalagem, acessada por uma porta da vila", "La posada, a la que se entra por una puerta de la aldea", "Das Gasthaus, erreichbar durch eine Tür im Dorf", "村の扉から入れる宿屋", "마을 문으로 들어가는 여관", "从村庄的门进入的旅店"],
    "06-ruinas": ["Ruins of the Eclipse: a procedurally generated floor", "Ruínas do Eclipse: andar gerado proceduralmente", "Ruinas del Eclipse: un piso generado proceduralmente", "Ruinen der Finsternis: ein prozedural erzeugtes Stockwerk", "蝕の遺跡：手続き生成のフロア", "일식의 유적: 절차적으로 생성된 층", "日蚀遗迹：程序生成的楼层"],
    "07-editor-jogo": ["Game editor (F2): ruin styles", "Editor do jogo (F2): estilos das ruínas", "Editor del juego (F2): estilos de las ruinas", "Spieleditor (F2): Ruinenstile", "ゲームエディタ（F2）：遺跡のスタイル", "게임 에디터(F2): 유적 스타일", "游戏编辑器（F2）：遗迹风格"],
  },


  codebarx: {
    "01-lote": ["A generated batch, with codes selected to save", "Lote gerado, com códigos selecionados para salvar", "Lote generado, con códigos seleccionados para guardar", "Erzeugte Serie, Codes zum Speichern ausgewählt", "生成したバッチと保存用に選んだコード", "생성된 묶음과 저장할 코드 선택", "生成的批次，已选中要保存的条码"],
    "02-inicio": ["Format, quantities and prefix", "Formato, quantidades e prefixo", "Formato, cantidades y prefijo", "Format, Mengen und Präfix", "形式、数量、接頭辞", "형식, 수량, 접두사", "格式、数量与前缀"],
  },
  vault: {
    "01-inicio": ["Home: latest update, continue reading and shelf", "Início: última atualização, continuar lendo e estante", "Inicio: última actualización, seguir leyendo y estantería", "Start: neuestes Update, Weiterlesen und Regal", "ホーム：最新更新、続きを読む、本棚", "홈: 최신 업데이트, 이어 읽기, 책장", "首页：最新更新、继续阅读与书架"],
    "02-catalogo": ["Catalogue of 4,317 series with filters", "Catálogo de 4.317 séries com filtros", "Catálogo de 4.317 series con filtros", "Katalog mit 4.317 Serien und Filtern", "4,317作品のカタログとフィルター", "4,317개 시리즈 카탈로그와 필터", "4,317 部作品的目录与筛选"],
    "03-capitulos": ["Series page: picking chapters to archive", "Página da série: escolhendo capítulos para arquivar", "Página de la serie: eligiendo capítulos para archivar", "Serienseite: Kapitel zum Archivieren wählen", "作品ページ：保存する章を選ぶ", "시리즈 페이지: 보관할 회차 고르기", "作品页：选择要归档的章节"],
    "04-download": ["Download history: 47 chapters, 7 GB on disk", "Histórico de downloads: 47 capítulos, 7 GB em disco", "Historial de descargas: 47 capítulos, 7 GB en disco", "Download-Verlauf: 47 Kapitel, 7 GB auf der Festplatte", "ダウンロード履歴：47章、ディスク上7 GB", "다운로드 기록: 47화, 디스크 7GB", "下载记录：47 章，占用 7 GB"],
  },
};

export function captionFor(work: string, name: string, lang: Lang): string | undefined {
  return captions[work]?.[name]?.[LANG_ORDER.indexOf(lang)];
}
