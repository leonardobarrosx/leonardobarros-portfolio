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
    loop: ["An order moving from the table to the kitchen", "Um pedido saindo da mesa para a cozinha", "Un pedido que va de la mesa a la cocina", "Eine Bestellung vom Tisch in die Küche", "テーブルから厨房へ流れる注文", "테이블에서 주방으로 가는 주문", "订单从餐桌流向厨房"],
    "01-cozinha": ["Kitchen display", "Tela da cozinha", "Pantalla de cocina", "Küchendisplay", "厨房ディスプレイ", "주방 화면", "厨房显示屏"],
    "02-pedidos": ["Orders by table", "Pedidos por mesa", "Pedidos por mesa", "Bestellungen pro Tisch", "テーブル別の注文", "테이블별 주문", "按桌查看订单"],
    "03-cardapio": ["Menu management", "Gestão do cardápio", "Gestión del menú", "Speisekartenverwaltung", "メニュー管理", "메뉴 관리", "菜单管理"],
    "04-painel": ["Management dashboard", "Painel gerencial", "Panel de gestión", "Management-Dashboard", "管理ダッシュボード", "관리 대시보드", "管理仪表盘"],
    "05-garcom": ["Waiter app on the phone", "App do garçom no celular", "App del camarero en el móvil", "Kellner-App auf dem Handy", "スマホのホールスタッフ用アプリ", "휴대폰의 서빙 직원 앱", "手机上的服务员应用"],
  },
  ninho: {
    loop: ["Paying a bill, undoing it, marking an appointment done and switching to dark", "Pagando uma conta, desfazendo, marcando uma consulta e trocando para o escuro", "Pagar una cuenta, deshacerlo, marcar una cita y pasar al tema oscuro", "Rechnung bezahlen, rückgängig machen, Termin abhaken, dunkles Theme", "支払い、取り消し、通院の完了、ダークテーマへの切り替え", "결제, 되돌리기, 진료 완료 표시, 다크 테마 전환", "付款、撤销、标记预约完成并切换到深色主题"],
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
    "01-vila": ["The village, in game", "A vila, dentro do jogo", "La aldea, en el juego", "Das Dorf im Spiel", "ゲーム内の村", "게임 속 마을", "游戏中的村庄"],
    "02-criacao": ["Character creation", "Criação de personagem", "Creación de personaje", "Charaktererstellung", "キャラクター作成", "캐릭터 생성", "角色创建"],
    "03-equipamento": ["Equipment on the paper doll", "Equipamento no personagem", "Equipo en el personaje", "Ausrüstung an der Figur", "キャラクターの装備", "캐릭터 장비", "角色装备"],
    "04-noite": ["Night lighting", "Iluminação noturna", "Iluminación nocturna", "Nachtbeleuchtung", "夜のライティング", "밤 조명", "夜间光照"],
    "05-editor": ["In-game map editor", "Editor de mapas dentro do jogo", "Editor de mapas dentro del juego", "Karteneditor im Spiel", "ゲーム内マップエディター", "게임 내 맵 에디터", "游戏内地图编辑器"],
    "06-floresta": ["The forest", "A floresta", "El bosque", "Der Wald", "森", "숲", "森林"],
  },
  codebarx: {
    "01-lote": ["A generated batch, with codes selected to save", "Lote gerado, com códigos selecionados para salvar", "Lote generado, con códigos seleccionados para guardar", "Erzeugte Serie, Codes zum Speichern ausgewählt", "生成したバッチと保存用に選んだコード", "생성된 묶음과 저장할 코드 선택", "生成的批次，已选中要保存的条码"],
    "02-inicio": ["Format, quantities and prefix", "Formato, quantidades e prefixo", "Formato, cantidades y prefijo", "Format, Mengen und Präfix", "形式、数量、接頭辞", "형식, 수량, 접두사", "格式、数量与前缀"],
  },
  vault: {
    "01-inicio": ["Home with shelves", "Início com as estantes", "Inicio con las estanterías", "Start mit Regalen", "本棚のあるホーム", "책장이 있는 홈", "带书架的首页"],
    "02-catalogo": ["Catalogue with filters", "Catálogo com filtros", "Catálogo con filtros", "Katalog mit Filtern", "フィルター付きのカタログ", "필터가 있는 카탈로그", "带筛选的目录"],
    "03-capitulos": ["Picking chapters to archive", "Escolhendo capítulos para arquivar", "Eligiendo capítulos para archivar", "Kapitel zum Archivieren wählen", "保存する章を選ぶ", "보관할 회차 고르기", "选择要归档的章节"],
    "04-download": ["Download panel: folder, arrangement and format", "Painel de download: pasta, organização e formato", "Panel de descarga: carpeta, organización y formato", "Download-Panel: Ordner, Anordnung und Format", "ダウンロード：フォルダ、構成、形式", "다운로드: 폴더, 구성, 형식", "下载面板：文件夹、组织方式与格式"],
  },
};

export function captionFor(work: string, name: string, lang: Lang): string | undefined {
  return captions[work]?.[name]?.[LANG_ORDER.indexOf(lang)];
}
