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
    loop: ["A tour of the panel: dashboard, queue, ticket, SLA and reports", "Um tour pelo painel: dashboard, fila, chamado, SLA e relatórios", "Un recorrido por el panel: dashboard, cola, ticket, SLA e informes", "Ein Rundgang durchs Panel: Dashboard, Warteschlange, Ticket, SLA und Berichte", "パネルを一巡：ダッシュボード、キュー、チケット、SLA、レポート", "패널 둘러보기: 대시보드, 대기열, 티켓, SLA, 보고서", "面板一览：仪表盘、队列、工单、SLA 和报表"],
    "01-landing": ["Landing page", "Página inicial", "Página de inicio", "Startseite", "ランディングページ", "랜딩 페이지", "首页"],
    "02-painel": ["Dashboard with the day's queue", "Painel com a fila do dia", "Panel con la cola del día", "Dashboard mit der Tageswarteschlange", "当日のキューを表示するダッシュボード", "오늘의 대기열을 보여 주는 대시보드", "显示当日队列的仪表盘"],
    "03-fila": ["Ticket queue with filters", "Fila de chamados com filtros", "Cola de tickets con filtros", "Ticket-Warteschlange mit Filtern", "フィルター付きのチケット一覧", "필터가 있는 티켓 대기열", "带筛选的工单队列"],
    "04-detalhe": ["Ticket detail and history", "Detalhe e histórico do chamado", "Detalle e historial del ticket", "Ticketdetails und Verlauf", "チケットの詳細と履歴", "티켓 상세와 이력", "工单详情与历史"],
    "05-sla": ["SLA by priority", "SLA por prioridade", "SLA por prioridad", "SLA nach Priorität", "優先度別のSLA", "우선순위별 SLA", "按优先级的 SLA"],
    "06-relatorios": ["Reports", "Relatórios", "Informes", "Berichte", "レポート", "리포트", "报表"],
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
    "01-kds-current": ["Current kitchen interface — UI recreation with sample data", "Cozinha atual — recriação visual com dados ilustrativos", "Interfaz actual de cocina — recreación con datos ficticios", "Aktuelle Küchenoberfläche — Nachbildung mit Beispieldaten", "現行キッチン画面：サンプルデータで再現", "현재 주방 UI — 예시 데이터로 재현", "当前厨房界面——示例数据重现"],
    "02-dashboard-current": ["Current management interface — UI recreation with sample data", "Painel atual — recriação visual com dados ilustrativos", "Panel actual — recreación con datos ficticios", "Aktuelles Dashboard — Nachbildung mit Beispieldaten", "現行管理画面：サンプルデータで再現", "현재 관리 화면 — 예시 데이터로 재현", "当前管理界面——示例数据重现"],
    loop: ["An order moving from the table to the kitchen", "Um pedido saindo da mesa para a cozinha", "Un pedido que va de la mesa a la cocina", "Eine Bestellung vom Tisch in die Küche", "テーブルから厨房へ流れる注文", "테이블에서 주방으로 가는 주문", "订单从餐桌流向厨房"],
    "01-cozinha": ["Kitchen display", "Tela da cozinha", "Pantalla de cocina", "Küchendisplay", "厨房ディスプレイ", "주방 화면", "厨房显示屏"],
    "02-pedidos": ["Orders by table", "Pedidos por mesa", "Pedidos por mesa", "Bestellungen pro Tisch", "テーブル別の注文", "테이블별 주문", "按桌查看订单"],
    "03-cardapio": ["Menu management", "Gestão do cardápio", "Gestión del menú", "Speisekartenverwaltung", "メニュー管理", "메뉴 관리", "菜单管理"],
    "04-painel": ["Management dashboard", "Painel gerencial", "Panel de gestión", "Management-Dashboard", "管理ダッシュボード", "관리 대시보드", "管理仪表盘"],
    "05-garcom": ["Waiter app on the phone", "App do garçom no celular", "App del camarero en el móvil", "Kellner-App auf dem Handy", "スマホのホールスタッフ用アプリ", "휴대폰의 서빙 직원 앱", "手机上的服务员应用"],
  },
  ninho: {
    "loop-m": ["The app on the phone: overview, finances, layette, baby and health", "O app no celular: visão geral, finanças, enxoval, bebê e saúde", "La app en el móvil: resumen, finanzas, ajuar, bebé y salud", "Die App auf dem Handy: Übersicht, Finanzen, Erstausstattung, Baby und Gesundheit", "スマホのアプリ：概要、家計、出産準備、赤ちゃん、健康", "휴대폰 앱: 개요, 가계, 출산 준비물, 아기, 건강", "手机上的应用：概览、财务、待产包、宝宝和健康"],
    "01-desktop": ["Overview on a computer", "Visão geral no computador", "Resumen en el ordenador", "Übersicht am Computer", "パソコンでの概要画面", "컴퓨터에서 보는 개요", "电脑上的概览"],
    "02-telas": ["Overview, finances and layette", "Visão geral, finanças e enxoval", "Resumen, finanzas y ajuar", "Übersicht, Finanzen und Erstausstattung", "概要、家計、出産準備品", "개요, 재정, 출산 준비물", "概览、财务与婴儿用品"],
    "03-saude": ["Health, a new entry and the account menu", "Saúde, novo lançamento e menu da conta", "Salud, nuevo registro y menú de la cuenta", "Gesundheit, neuer Eintrag und Kontomenü", "健康、新規入力、アカウントメニュー", "건강, 새 항목, 계정 메뉴", "健康、新增记录与账户菜单"],
    "04-escuro": ["Opening screen and dark theme", "Abertura e tema escuro", "Pantalla de inicio y tema oscuro", "Startbildschirm und dunkles Theme", "起動画面とダークテーマ", "시작 화면과 다크 테마", "启动画面与深色主题"],
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
