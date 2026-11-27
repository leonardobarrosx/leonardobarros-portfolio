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
    "02-como": ["How it works: one order, four people, no paper", "Como funciona: um pedido, quatro pessoas, nenhum papel", "Cómo funciona: un pedido, cuatro personas, sin papel", "So funktioniert es: eine Bestellung, vier Personen, kein Papier", "仕組み：1つの注文、4人、紙なし", "작동 방식: 주문 하나, 네 사람, 종이 없이", "运作方式：一张订单，四个人，无需纸张"],
    "03-produto": ["Real product screens, one area at a time", "Telas reais do produto, uma área por vez", "Pantallas reales del producto, un área a la vez", "Echte Produktansichten, Bereich für Bereich", "実際の製品画面をエリアごとに", "실제 제품 화면을 영역별로", "真实产品界面，逐个区域展示"],
    "04-recursos": ["Features built for the dining room routine", "Recursos feitos para a rotina do salão", "Funciones pensadas para la rutina de la sala", "Funktionen für den Alltag im Gastraum", "ホールの日常に合わせた機能", "홀의 일상을 위한 기능", "为前厅日常打造的功能"],
    "05-painel": ["App: the manager's dashboard for the day", "App: o painel do gestor com o dia", "App: el panel del gerente con el día", "App: das Dashboard des Managers für den Tag", "アプリ：店長向けの当日ダッシュボード", "앱: 관리자의 오늘 대시보드", "应用：店长的当日仪表盘"],
    "06-mesas": ["App: the floor map with every table", "App: o mapa do salão com todas as mesas", "App: el mapa de la sala con todas las mesas", "App: der Saalplan mit allen Tischen", "アプリ：全テーブルのフロアマップ", "앱: 모든 테이블이 있는 홀 지도", "应用：全部餐桌的前厅平面图"],
    "07-pedidos": ["App: orders by status", "App: pedidos por status", "App: pedidos por estado", "App: Bestellungen nach Status", "アプリ：ステータス別の注文", "앱: 상태별 주문", "应用：按状态划分的订单"],
    "08-pdv": ["App: counter sale at the point of sale", "App: venda no balcão pelo PDV", "App: venta en mostrador desde el punto de venta", "App: Thekenverkauf an der Kasse", "アプリ：POSでのカウンター販売", "앱: POS에서 카운터 판매", "应用：收银台的柜台销售"],
    "09-cozinha": ["App: the kitchen display, from waiting to ready", "App: a tela da cozinha, de aguardando a pronto", "App: la pantalla de cocina, de en espera a listo", "App: das Küchendisplay, von wartend bis fertig", "アプリ：待機から完成までのキッチン画面", "앱: 대기에서 완료까지 주방 화면", "应用：从等待到完成的厨房屏幕"],
    "10-financeiro": ["App: finance with payables and receivables", "App: financeiro com contas a pagar e a receber", "App: finanzas con cuentas por pagar y cobrar", "App: Finanzen mit Verbindlichkeiten und Forderungen", "アプリ：支払と入金の財務", "앱: 지급과 수금이 있는 재무", "应用：含应付与应收的财务"],
    "11-m-landing": ["The landing page on a phone", "A landing page no celular", "La landing page en el móvil", "Die Landingpage auf dem Smartphone", "スマートフォンのランディングページ", "휴대폰에서 보는 랜딩 페이지", "手机上的落地页"],
    "12-m-garcom-mesas": ["Waiter app: tables and their status", "App do garçom: mesas e seus status", "App del mesero: mesas y su estado", "Kellner-App: Tische und ihr Status", "ウェイターアプリ：テーブルと状態", "서버 앱: 테이블과 상태", "服务员应用：餐桌与状态"],
    "13-m-garcom-cardapio": ["Waiter app: adding items from the menu", "App do garçom: lançando itens do cardápio", "App del mesero: agregando platos del menú", "Kellner-App: Gerichte aus der Karte hinzufügen", "ウェイターアプリ：メニューから注文を追加", "서버 앱: 메뉴에서 항목 추가", "服务员应用：从菜单添加菜品"],
    "14-m-garcom-comanda": ["Waiter app: the table's tab sent to the kitchen", "App do garçom: a comanda da mesa enviada à cozinha", "App del mesero: la comanda de la mesa enviada a cocina", "Kellner-App: die Tischrechnung an die Küche geschickt", "ウェイターアプリ：キッチンへ送られたテーブルの伝票", "서버 앱: 주방으로 보낸 테이블 주문서", "服务员应用：发送到厨房的餐桌订单"],
  },

  ninho: {
    "loop-m": ["The app on the phone: overview, finances, layette, baby and health", "O app no celular: visão geral, finanças, enxoval, bebê e saúde", "La app en el móvil: resumen, finanzas, ajuar, bebé y salud", "Die App auf dem Handy: Übersicht, Finanzen, Erstausstattung, Baby und Gesundheit", "スマホのアプリ：概要、家計、出産準備、赤ちゃん、健康", "휴대폰 앱: 개요, 가계, 출산 준비물, 아기, 건강", "手机上的应用：概览、财务、待产包、宝宝和健康"],
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
    "01-landing": ["Landing page: from prescription to delivery, in focus", "Landing page: da receita à entrega, sua ótica em foco", "Landing page: de la receta a la entrega, tu óptica en foco", "Landingpage: vom Rezept bis zur Abholung im Blick", "ランディングページ：処方から受け渡しまで", "랜딩 페이지: 처방부터 인도까지 한눈에", "落地页：从处方到交付，一目了然"],
    "02-fluxo": ["How it works: the store's routine in one flow", "Como funciona: a rotina da ótica num fluxo só", "Cómo funciona: la rutina de la óptica en un solo flujo", "So funktioniert es: der Alltag des Geschäfts in einem Ablauf", "仕組み：店舗の日常をひとつの流れに", "작동 방식: 매장 일상을 하나의 흐름으로", "运作方式：门店日常汇成一个流程"],
    "03-recursos": ["Features: glasses built at the point of sale", "Recursos: os óculos montados na venda", "Funciones: las gafas armadas en la venta", "Funktionen: die Brille beim Verkauf zusammenstellen", "機能：販売時にメガネを組み立て", "기능: 판매 시점에 안경 구성", "功能：在销售时组配眼镜"],
    "04-ia": ["AI and integrations: ask the store, connect the rest", "IA e integrações: pergunte para a ótica, conecte o resto", "IA e integraciones: pregunta a la óptica, conecta el resto", "KI und Integrationen: das Geschäft fragen, den Rest anbinden", "AIと連携：店舗に質問し、他とつなぐ", "AI와 연동: 매장에 묻고 나머지를 연결", "AI 与集成：向门店提问，连接其他系统"],
    "05-seguranca": ["Security: each store's data isolated by RLS", "Segurança: os dados de cada ótica isolados por RLS", "Seguridad: los datos de cada óptica aislados con RLS", "Sicherheit: Daten jedes Geschäfts per RLS getrennt", "セキュリティ：RLSで店舗ごとにデータを分離", "보안: RLS로 매장별 데이터 분리", "安全：以 RLS 隔离每家门店的数据"],
    "06-visao-geral": ["Overview with the store's flow", "Visão geral com o fluxo da ótica", "Resumen con el flujo de la óptica", "Übersicht mit dem Ablauf des Geschäfts", "店舗の流れが分かる概要画面", "매장 흐름을 보여 주는 개요", "显示门店流程的概览"],
    "07-laboratorio": ["Lab orders by stage", "Ordens do laboratório por etapa", "Órdenes del laboratorio por etapa", "Werkstattaufträge nach Stufe", "工程別のラボ作業指示", "단계별 가공실 작업 지시", "按阶段划分的加工工单"],
    "08-pdv": ["Point of sale", "PDV", "Punto de venta", "Kasse", "POS", "POS", "收银台"],
    "09-financeiro": ["Finance: payables and receivables", "Financeiro: contas a pagar e a receber", "Finanzas: cuentas por pagar y cobrar", "Finanzen: Verbindlichkeiten und Forderungen", "財務：支払と入金", "재무: 지급과 수금", "财务：应付与应收"],
    "10-estoque": ["Stock with entries and counts", "Estoque com entradas e contagens", "Stock con entradas y recuentos", "Lager mit Zugängen und Inventur", "入庫と棚卸のある在庫", "입고와 실사가 있는 재고", "含入库与盘点的库存"],
    "11-pacientes": ["Patients and dependants", "Pacientes e dependentes", "Pacientes y dependientes", "Patienten und Angehörige", "患者と家族", "환자와 가족", "顾客及其家属"],
    "12-assistente-ia": ["AI assistant: a 30-day purchase plan from the store's own data", "Assistente de IA: sugestão de compra para 30 dias com os dados da ótica", "Asistente de IA: sugerencia de compra a 30 días con los datos de la óptica", "KI-Assistent: Einkaufsvorschlag für 30 Tage aus den Daten des Geschäfts", "AIアシスタント：店舗データから30日分の仕入れ提案", "AI 어시스턴트: 매장 데이터로 만든 30일 구매 제안", "AI 助手：基于门店数据的 30 天采购建议"],
    "13-chaves-api": ["Integrations: v1 API keys with scoped permissions", "Integrações: chaves da API v1 com permissões por escopo", "Integraciones: claves de la API v1 con permisos por alcance", "Integrationen: v1-API-Schlüssel mit eingeschränkten Rechten", "連携：権限を絞ったAPI v1キー", "연동: 권한 범위를 지정한 API v1 키", "集成：带权限范围的 API v1 密钥"],
    "14-webhooks": ["Integrations: signed webhooks for sales, lab orders and stock", "Integrações: webhooks assinados para vendas, OS e estoque", "Integraciones: webhooks firmados para ventas, órdenes y stock", "Integrationen: signierte Webhooks für Verkäufe, Aufträge und Lager", "連携：販売、作業指示、在庫の署名付きWebhook", "연동: 판매, 작업 지시, 재고용 서명된 웹훅", "集成：用于销售、工单和库存的签名 Webhook"],
    "15-m-landing": ["The landing page on a phone", "A landing page no celular", "La landing page en el móvil", "Die Landingpage auf dem Smartphone", "スマートフォンのランディングページ", "휴대폰에서 보는 랜딩 페이지", "手机上的落地页"],
    "16-m-fluxo": ["Mobile: the store's flow", "Celular: o fluxo da ótica", "Móvil: el flujo de la óptica", "Mobil: der Ablauf des Geschäfts", "モバイル：店舗の流れ", "모바일: 매장의 흐름", "手机：门店流程"],
    "17-m-ia": ["Mobile: AI and integrations", "Celular: IA e integrações", "Móvil: IA e integraciones", "Mobil: KI und Integrationen", "モバイル：AIと連携", "모바일: AI와 연동", "手机：AI 与集成"],
    "18-m-seguranca": ["Mobile: security", "Celular: segurança", "Móvil: seguridad", "Mobil: Sicherheit", "モバイル：セキュリティ", "모바일: 보안", "手机：安全"],
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
