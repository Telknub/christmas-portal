import {
  AchievementsTerms,
  Action,
  AddSFL,
  AvailableSeeds,
  Base,
  Beach,
  BeachLuck,
  BirdiePlaza,
  BoostDescriptions,
  BoostEffectDescriptions,
  BountyDescription,
  BuildingDescriptions,
  BumpkinItemBuff,
  BumpkinPartRequirements,
  BumpkinSkillsDescription,
  BumpkinTrade,
  BuyFarmHand,
  ClaimAchievement,
  Chat,
  ChickenWinner,
  ChoresStart,
  ChumDetails,
  Community,
  CompostDescription,
  ComposterDescription,
  ConfirmSkill,
  ConfirmationTerms,
  Conversations,
  CropFruitDescriptions,
  Deliveryitem,
  DefaultDialogue,
  DecorationDescriptions,
  Delivery,
  DeliveryHelp,
  DepositWallet,
  Detail,
  DiscordBonus,
  Donation,
  ErrorAndAccess,
  ErrorTerms,
  ExoticShopItems,
  FestiveTree,
  FishDescriptions,
  FishermanModal,
  FishermanQuest,
  FishingChallengeIntro,
  FishingGuide,
  FishingQuests,
  Flowerbedguide,
  FoodDescriptions,
  GameDescriptions,
  GameTerms,
  GarbageCollector,
  GeneralTerms,
  GetContent,
  GetInputErrorMessage,
  GOBLIN_MESSAGES,
  GoldPassModal,
  GoldTooth,
  GuideTerms,
  GrubShop,
  HalveningCountdown,
  Harvestflower,
  HarvestBeeHive,
  HayseedHankPlaza,
  HayseedHankV2,
  HeliosSunflower,
  HenHouseTerms,
  HowToFarm,
  HowToSync,
  HowToUpgrade,
  Islandupgrade,
  InteractableModals,
  Intro,
  IntroPage,
  IslandName,
  IslandNotFound,
  Kick,
  Kicked,
  LandscapeTerms,
  LetsGo,
  LevelUpMessages,
  Loser,
  LostSunflorian,
  ModalDescription,
  Mute,
  NoBumpkin,
  NoTownCenter,
  NotOnDiscordServer,
  NPC_MESSAGE,
  Npc,
  NpcDialogues,
  NyeButton,
  ObsessionDialogue,
  Offer,
  PirateQuest,
  Onboarding,
  OnCollectReward,
  OrderHelp,
  Parsnip,
  Pending,
  PersonHood,
  Pickserver,
  PlazaSettings,
  PlayerTrade,
  Portal,
  PurchaseableBaitTranslation,
  Quest,
  Questions,
  Reaction,
  Refunded,
  RemoveKuebiko,
  Resale,
  Restock,
  RetreatTerms,
  RewardTerms,
  RulesGameStart,
  RulesTerms,
  SceneDialogueKey,
  SeasonTerms,
  Session,
  SettingsMenu,
  Share,
  SharkBumpkinDialogues,
  Shelly,
  ShellyDialogue,
  ShopItems,
  ShowingFarm,
  SnorklerDialogues,
  Statements,
  StopGoblin,
  SubSettings,
  Swarming,
  TieBreaker,
  ToolDescriptions,
  TransactionTerms,
  TranslationKeys,
  Transfer,
  TransferAccount,
  TreasureModal,
  TutorialPage,
  VisitislandEnter,
  VisitislandNotFound,
  WarningTerms,
  WelcomeTerms,
  Winner,
  Withdraw,
  WornDescription,
  World,
} from "./types";

const generalTerms: Record<GeneralTerms, string> = {
  "2x.sale": "Venda 2x",
  "action.deposit": "Depósito",
  add: "Adicionar",
  "add.liquidity": "Adicionar liquidez",
  "alr.bought": "Já comprado",
  "alr.claim": "Já reivindicado!",
  "alr.completed": "Já concluído",
  "alr.crafted": "Já fabricado!",
  "alr.minted": "Já cunhado!",
  "card.cash": "Cartão/Dinheiro",
  "claim.skill": "Reivindicar habilidade",
  "coming.soon": "Em breve",
  "copy.adress": "Copiar endereço",
  danger: "Perigo",
  "drafting.select": "Selecione um item para listar",
  "drafting.noitem": "Nenhum item disponível para listar",
  "drafting.trade.detail": "Detalhes do Comércio",
  "easter.eggs": "Ovos de Páscoa",
  empty: "Vazio",
  "farm.storage": "Armazenamento da Fazenda",
  "feed.bumpkin": "Alimentar Bumpkin",
  "fish.caught": "Peixes capturados:",
  "free.trade": "Comércio Livre",
  "grant.wish": "Conceder um desejo",
  "go.home": "Ir para casa",
  "goblin.delivery":
    "Os goblins guardam a sua parte da entrega no tesouro. Veja também em",
  "hungry?": "Com fome?",
  "land.id": "ID do terreno",
  "last.updated": "Última atualização:",
  "lets.go": "Vamos lá!",
  "list.trade": "Listar comércio",
  "make.wish": "Fazer um desejo",
  "making.wish": "Fazendo um desejo",
  "no.mail": "Sem correio",
  "no.limits.exceeded": "Nenhum limite excedido",
  "no.thanks": "Não, obrigado",
  "yes.please": "Sim, por favor",
  "ocean.fishing": "Pesca no oceano",
  "open.gift": "Abrir presente",
  "pass.required": "Passe necessário",
  "place.map": "Colocar no mapa",
  "placing.bid": "Fazendo uma oferta",
  "providing.liquidity": "Fornecendo liquidez",
  "ready.trade": "Pronto para negociar?",
  "read.more": "Leia mais",
  "remaining.trades": "Comércios Restantes",
  "reward.discovered": "Recompensa descoberta",
  "select.resource": "Selecione seu recurso:",
  "sell.all": "Vender tudo",
  "sell.one": "Vender 1",
  "sell.ten": "Vender 10",
  "skip.order": "Pular pedido",
  "sound.effects": "Efeitos sonoros:",
  "support.team": "Equipe de suporte",
  submit: "Enviar",
  submitting: "Submetendo",
  "total.price": "Preço total:",
  "trash.collection": "Coleta de lixo",
  "try.again": "Tente novamente",
  "unlock.land": "Desbloquear mais terreno",
  "use.craft": "Usado para fabricar itens",
  "chicken.description": "Usado para botar ovos",
  "honey.description": "Usado para adoçar seus pratos",
  "wildMushroom.description": "Usado para cozinhar receitas básicas",
  "magicMushroom.description": "Usado para cozinhar receitas avançadas",
  "visit.enter.land":
    "Digite um ID de terreno para navegar no que está em oferta.",
  "visit.friend": "Visitar um amigo",
  "visit.land": "Visitar terreno",
  "wishing.well": "Poço dos desejos",
  "you.are.here": "Você está aqui",
  achievements: "Conquistas",
  auctions: "Leilões",
  back: "Voltar",
  bait: "Isca",
  basket: "Cesta",
  beta: "Beta",
  bounty: "Recompensa",
  build: "Construir",
  buy: "Comprar",
  craft: "Fabricar",
  cancel: "Cancelar",
  check: "Verificar",
  chest: "Baú",
  chores: "Tarefas",
  claim: "Reivindicar",
  clear: "Limpar",
  close: "Fechar",
  completed: "Concluído",
  confirm: "Confirmar",
  congrats: "Parabéns!",
  connected: "Conectado",
  connecting: "Conectando",
  continue: "Continuar",
  cook: "Cozinhar",
  coupons: "Cupons",
  crafting: "Fabricação",
  crops: "Culturas",
  date: "Data",
  deliveries: "Entregas",
  delivery: "Entrega",
  details: "Detalhes",
  egg: "Ovo",
  equip: "Equipar",
  error: "Erro",
  exotics: "Exóticos",
  expand: "Expandir",
  explore: "Explorar",
  farm: "Fazenda",
  featured: "Destaque",
  fertilisers: "Fertilizantes",
  fish: "Peixe",
  foods: "Alimentos",
  for: "para",
  forbidden: "Proibido",
  fruit: "Fruta",
  fruits: "Frutas",
  gotIt: "Entendi",
  guide: "Guia",
  info: "Info",
  item: "Item:",
  left: "Restante",
  list: "Lista",
  loading: "Carregando",
  lvl: "Nível",
  maintenance: "Manutenção",
  mins: "minutos",
  mint: "Cunhar",
  minting: "Cunhagem",
  music: "Música",
  next: "Próximo",
  nextSkillPtLvl: "Próximo ponto de habilidade: nível",
  no: "Não",
  ok: "OK",
  print: "Imprimir",
  purchasing: "Comprando",
  rank: "Classificação",
  remove: "Remover",
  refresh: "Atualizar",
  refreshing: "Atualizando",
  required: "necessário",
  reqSkillPts: "Pontos de habilidade necessários",
  reqSkills: "Habilidades necessárias:",
  resources: "Recursos",
  restock: "Reabastecer",
  retry: "Tentar novamente",
  save: "Salvar",
  saving: "Salvando",
  start: "Iniciar",
  share: "Compartilhar",
  secs: "segundos",
  seeds: "Sementes",
  sell: "Vender",
  shopping: "Compras",
  skillPts: "Pontos de habilidade:",
  skills: "Habilidades",
  success: "Sucesso!",
  swapping: "Trocando",
  syncing: "Sincronizando",
  task: "Tarefa",
  tools: "Ferramentas",
  total: "Total",
  trades: "Trocas",
  trading: "Negociando",
  transfer: "Transferir",
  travel: "Viajar",
  uhOh: "Uh oh!",
  unlocking: "Desbloqueando",
  verify: "Verificar",
  version: "Versão",
  viewAll: "Ver tudo",
  warning: "Aviso",
  wallet: "Carteira",
  welcome: "Bem-vindo!",
  withdraw: "Retirar",
  yes: "Sim",
};

const achievementTerms: Record<AchievementsTerms, string> = {
  "breadWinner.description": "Ganhe 0,001 SFL",
  "breadWinner.one":
    "Olha só, parceiro... Parece que você está precisando de alguns SFL!",
  "breadWinner.two":
    "Em Sunflower Land, uma reserva saudável de SFL é a chave para fabricar ferramentas, construções e NFTs raros.",
  "breadWinner.three":
    "A maneira mais rápida de ganhar SFL é plantar e vender culturas.",

  "sunSeeker.description": "Colha girassol 100 vezes",
  "cabbageKing.description": "Colha repolho 200 vezes",
  "jackOLantern.description": "Colha abóbora 500 vezes",
  "coolFlower.description": "Colha couve-flor 100 vezes",
  "farmHand.description": "Colha culturas 10.000 vezes",
  "beetrootBeast.description": "Colha beterraba 2.000 vezes",
  "myLifeIsPotato.description": "Colha batata 5.000 vezes",
  "rapidRadish.description": "Colha rabanete 200 vezes",
  "twentyTwentyVision.description": "Colha cenoura 10.000 vezes",
  "stapleCrop.description": "Colha trigo 10.000 vezes",
  "sunflowerSuperstar.description": "Colha girassol 100.000 vezes",
  "bumpkinBillionaire.description": "Ganhe 5.000 SFL",
  "patientParsnips.description": "Colha pastinaga 5.000 vezes",
  "cropChampion.description": "Colha 1 milhão de culturas",

  "busyBumpkin.description": "Alcance o nível 2",
  "busyBumpkin.one":
    "Olá, meu amigo ambicioso! Para desbloquear novas culturas, expansões, construções e muito mais, você precisará subir de nível.",
  "busyBumpkin.two":
    "Vá até a Fogueira, prepare uma deliciosa receita e alimente seu Bumpkin.",

  "kissTheCook.description": "Prepare 20 refeições",
  "bakersDozen.description": "Cozinhe 13 bolos",
  "brilliantBumpkin.description": "Alcance o nível 20",
  "chefDeCuisine.description": "Prepare 5.000 refeições",

  "scarecrowMaestro.description":
    "Fabrique um espantalho e melhore suas culturas",
  "scarecrowMaestro.one":
    "Olá, parceiro! É hora de aprender a arte da fabricação e melhorar suas habilidades agrícolas.",
  "scarecrowMaestro.two":
    "Vá até a Pumpkin Plaza, visite o Blacksmith e fabrique um espantalho.",

  "bigSpender.description": "Gaste 10 SFL",
  "museum.description":
    "Tenha 10 tipos diferentes de itens raros colocados em seu terreno",
  "highRoller.description": "Gaste 7.500 SFL",
  "timbeerrr.description": "Derrube 150 árvores",
  "craftmanship.description": "Fabrique 100 ferramentas",
  "driller.description": "Extraia 50 rochas de pedra",
  "ironEyes.description": "Extraia 50 rochas de ferro",
  "elDorado.description": "Extraia 50 rochas de ouro",
  "timeToChop.description": "Fabrique 500 machados",
  "canary.description": "Extraia 1.000 rochas de pedra",
  "somethingShiny.description": "Extraia 500 rochas de ferro",
  "bumpkinChainsawAmateur.description": "Derrube 5.000 árvores",
  "goldFever.description": "Extraia 500 rochas de ouro",

  // Explorador
  "explorer.description": "Expanda seu terreno",
  "explorer.one":
    "Vamos coletar madeira derrubando essas árvores e expandir a ilha. Vá em frente e descubra a melhor maneira de fazer isso.",

  "expansion.description": "Expanda seu terreno para novos horizontes.",

  // Poço da Prosperidade
  "wellOfProsperity.description": "Construa um poço",
  "wellOfProsperity.one": "Olha só, o que temos aqui?",
  "wellOfProsperity.two":
    "Parece que suas culturas estão com sede. Para sustentar mais delas, você primeiro precisa construir um poço.",

  "contractor.description": "Construa 10 edifícios em seu terreno",
  "fruitAficionado.description": "Colha 50 frutas",
  "fruitAficionado.one":
    "Olá, colhedor de frutas! As frutas são os presentes mais doces da natureza e trazem uma explosão de sabor para sua fazenda.",
  "fruitAficionado.two":
    "Ao coletar diferentes frutas, como maçãs, laranjas e mirtilos, você desbloqueará receitas únicas, fortalecerá suas habilidades culinárias e criará delícias.",

  "orangeSqueeze.description": "Colha laranjas 100 vezes",
  "appleOfMyEye.description": "Colha maçãs 500 vezes",
  "blueChip.description": "Colha mirtilos 5.000 vezes",
  "fruitPlatter.description": "Colha 50.000 frutas",
  "crowdFavourite.description": "Faça 100 entregas",

  "deliveryDynamo.description": "Faça 3 entregas",
  "deliveryDynamo.one":
    "Olá, fazendeiro confiável! Os Bumpkins de todos os lugares precisam da sua ajuda com entregas.",
  "deliveryDynamo.two":
    "Ao fazer entregas, você os deixará felizes e ganhará em troca recompensas fantásticas em SFL.",

  "seasonedFarmer.description": "Colete 50 Recursos Sazonais",
  "seasonedFarmer.one":
    "Olá, aventureiro da estação! Sunflower Land é conhecida por suas temporadas especiais cheias de itens únicos e surpresas.",
  "seasonedFarmer.two":
    "Ao coletar recursos sazonais, você terá acesso a recompensas por tempo limitado, criações exclusivas e tesouros raros. É como ter um ingresso na primeira fila para as maravilhas de cada estação.",
  "seasonedFarmer.three":
    "Então, complete tarefas, participe de eventos e colete esses bilhetes sazonais para aproveitar o melhor que Sunflower Land tem a oferecer!",
  "treasureHunter.description": "Cave 10 buracos",
  "treasureHunter.one":
    "Ahoy, caçador de tesouros! Sunflower Land está cheia de tesouros escondidos esperando para serem descobertos.",
  "treasureHunter.two":
    "Pegue sua pá e vá para a Ilha do Tesouro, onde você pode cavar para encontrar itens valiosos e surpresas raras.",
  "eggcellentCollection.description": "Colete 10 ovos",
  "eggcellentCollection.one":
    "Olá, colecionador de ovos! As galinhas são companheiras maravilhosas da fazenda que nos fornecem deliciosos ovos.",
  "eggcellentCollection.two":
    "Ao coletar ovos, você terá um suprimento fresco de ingredientes para cozinhar, e também desbloqueará receitas especiais e bônus.",

  "task.harvestSunflowers": "Colha 10 girassóis",
};

const action: Record<Action, string> = {
  "action.bid.message": "Você fez sua oferta.",
  "action.bid": "Ofertar",
  "action.reveal": "Revelar vencedores",
  "action.time": "Leilão:",
  "action.live": "O leilão está acontecendo!",
  "action.requirement": "Requisitos",
  "action.start": "Hora de início",
  "action.period": "Período do leilão",
  "action.closed": "Leilão encerrado",
  "action.rank": "Classificação",
  "action.farm": "Fazenda",
  "action.const": "Em construção!",
  "action.const.soon": "Este recurso chegará em breve.",
};

const addSFL: Record<AddSFL, string> = {
  "addSFL.loading": "Carregando",
  "addSFL.swapDetails":
    "Sunflower Land oferece uma maneira rápida de trocar Matic por SFL via Quickswap.",
  "addSFL.referralFee":
    "Sunflower Land cobra uma taxa de referência de 5% para realizar esta transação.",
  "addSFL.swapTitle": "Detalhes da Troca",
  "addSFL.balance": "Saldo: ",
  "addSFL.for": "por",
  "addSFL.minimumReceived": "Mínimo recebido:",
  "addSFL.addSFL": "Adicionar SFL",
  "addSFL.title": "Adicionar SFL",
};

const availableSeeds: Record<AvailableSeeds, string> = {
  "availableSeeds.select": "Semente não selecionada",
  "availableSeeds.select.plant":
    "Qual semente você gostaria de selecionar e plantar?",
  "availableSeeds.plant": "Plantar",
};

const base: Record<Base, string> = {
  "base.missing": "Nome ausente na configuração",
  "base.far.away": "Você está muito longe",
};

const beach: Record<Beach, string> = {
  "beach.party": "Estamos trabalhando duro para preparar uma festa na praia.",
  "beach.ready":
    "Prepare seu protetor solar e guarda-sóis, o verão está chegando!",
};

const beachLuck: Record<BeachLuck, string> = {
  "beachLuck.tryLuck": "Quer tentar a sua sorte hoje?",
  "beachLuck.uncleFound":
    "Meu tio encontrou um anel de diamante cavando nesta praia. Tudo o que eu encontro são moedas SFL chatas.",
  "beachLuck.grabShovel": "Basta pegar uma pá e começar a cavar.",
  "beachLuck.refreshesIn": "Atualização dos tesouros em:",
};

const birdiePlaza: Record<BirdiePlaza, string> = {
  "birdieplaza.birdieIntro":
    "Oi, eu sou o Birdie, o Bumpkin mais bonito por aqui!",
  "birdieplaza.admiringOutfit":
    "Notei que você estava admirando minha roupa. Não é fantástica?!?",
  "birdieplaza.currentSeason": "Atualmente estamos na",
  "birdieplaza.currentSeason.two":
    "Temporada e os Bumpkins estão loucos pelos.",
  "birdieplaza.collectTickets": "Colete o suficiente de",
  "birdieplaza.collectTickets.two":
    "e você poderácriar NFTs raros. Foi assim que consegui esta saída rara!",
  "birdieplaza.whatIsSeason": "O que é uma temporada?",
  "birdieplaza.howToEarnTickets": "Como ganhar",
  "birdieplaza.earnTicketsVariety": "Você pode ganhar",
  "birdieplaza.earnTicketsVariety.two": "de várias maneiras.",
  "birdieplaza.commonMethod": "A maneira mais comum de ganhar",
  "birdieplaza.commonMethod.two":
    "é coletando recursos e entregando-os aos Bumpkins na Plaza.",
  "birdieplaza.choresAndRewards": "Você também pode ganhar",
  "birdieplaza.choresAndRewards.two":
    "completando tarefas para Hank e reivindicando recompensas diárias!",
  "birdieplaza.gatherAndCraft": "Reúna o suficiente de",
  "birdieplaza.gatherAndCraft.two":
    "e você poderá fabricar itens raros como eu.",
  "birdieplaza.newSeasonIntro":
    "A cada 3 meses, uma nova temporada é introduzida no Sunflower Land.",
  "birdieplaza.seasonQuests":
    "Esta temporada tem missões emocionantes e colecionáveis raros que você pode ganhar.",
  "birdieplaza.craftItems": "Para fabricar esses itens, você precisa coletar",
  "birdieplaza.craftItems.two": "e trocá-los nas lojas ou na casa de leilões.",
};

const boostDescriptions: Record<BoostDescriptions, string> = {
  // Mutant Chickens
  "description.speed.chicken.one":
    "Suas galinhas agora produzirão ovos 10% mais rápido.",
  "description.speed.chicken.two": "Produz ovos 10% mais rápido",
  "description.fat.chicken.one":
    "Suas galinhas agora precisarão de 10% menos trigo por refeição.",
  "description.fat.chicken.two":
    "10% menos trigo necessário para alimentar uma galinha",
  "description.rich.chicken.one":
    "Suas galinhas agora produzirão 10% mais ovos.",
  "description.rich.chicken.two": "Produz 10% mais ovos",
  "description.ayam.cemani": "A galinha mais rara que existe!",
  "description.el.pollo.veloz.one":
    "Suas galinhas botarão ovos 4 horas mais rápido!",
  "description.el.pollo.veloz.two":
    "Dê-me esses ovos, rápido! Boost de velocidade de postura de 4 horas.",
  "description.banana.chicken":
    "Uma galinha que impulsiona bananas. Que mundo vivemos.",

  // Boosts
  "description.lab.grow.pumpkin": "+0.3 de rendimento para as Abóboras",
  "description.lab.grown.radish": "+0.4 de rendimento para os Rabanetes",
  "description.lab.grown.carrot": "+0.2 de rendimento para as Cenouras",
  "description.purple.trail":
    "Deixe seus adversários com inveja com a trilha roxa encantadora e única",
  "description.obie": "Um soldado feroz de berinjela",
  "description.maximus": "Esmague a concorrência com o robusto Maximus",
  "description.mushroom.house":
    "Uma morada fantástica de cogumelos onde as paredes brotam charme e até os móveis têm um 'spore-tacular'!",
  "description.Karkinos":
    "Pinçando mas gentil, a adição de repolho-impulsionando à sua fazenda!",
  "description.heart.of.davy.jones":
    "Quem o possui tem um imenso poder sobre os sete mares, pode cavar tesouros sem se cansar",
  "description.tin.turtle":
    "A Tartaruga de Lata dá +0.1 às Pedras que você mina em sua Área de Efeito.",
  "description.emerald.turtle":
    "A Tartaruga Esmeralda dá +0.5 a todos os minerais que você mina em sua Área de Efeito.",
  "description.iron.idol":
    "O Ídolo adiciona 1 ferro cada vez que você mina ferro.",
  "description.skill.shrimpy":
    "Shrimpy está aqui para ajudar! Ele garantirá aquele XP extra dos peixes.",
  "description.soil.krabby":
    "Peneiração rápida com um sorriso! Aproveite um aumento de 10% na velocidade do composto com este campeão crustáceo.",
  "description.nana":
    "Esta rara beleza é uma maneira infalível de aumentar suas colheitas de banana.",
  "description.grain.grinder":
    "Moa seu grão e experimente um delicioso aumento de XP de Bolo.",
  "description.kernaldo": "O mágico sussurrador de milho.",
  "description.poppy": "O grão de milho místico.",
  "description.victoria.sisters": "As irmãs apaixonadas por abóboras",
  "description.undead.rooster":
    "Uma vítima infeliz da guerra. Aumento de 10% na produção de ovos.",
  "description.observatory":
    "Explore as estrelas e melhore o desenvolvimento científico",
  "description.engine.core": "O poder do girassol",
  "description.time.warp.totem":
    "Velocidade dobrada para culturas, árvores, cozinha e minerais. Dura apenas 2 horas",
  "description.time.warp.totem.expired":
    "Seu Totem de Distorção Temporal expirou. Vá até a Praça da Abóbora para descobrir e criar mais itens mágicos para aumentar suas habilidades de agricultura!",
  "description.time.warp.totem.temporarily":
    "O Totem de Distorção Temporal aumenta temporariamente o tempo de cozimento, culturas, árvores e minerais. Aproveite ao máximo!",
  "description.cabbage.boy": "Não acorde o bebê!",
  "description.cabbage.girl": "Shh, ele está dormindo",
  "description.wood.nymph.wendy":
    "Lança um encanto para seduzir as fadas da floresta.",
  "description.peeled.potato":
    "Uma batata preciosa, incentiva batatas bônus na colheita.",
  "description.potent.potato":
    "Poderosa! Dá 3% de chance de obter +10 batatas na colheita.",
  "description.radical.radish":
    "Radical! Dá 3% de chance de obter +10 rabanetes na colheita.",
  "description.stellar.sunflower":
    "Estelar! Dá 3% de chance de obter +10 girassóis na colheita.",
  "description.lady.bug":
    "Um incrível inseto que se alimenta de pulgões. Melhora a qualidade das maçãs.",
  "description.squirrel.monkey":
    "Um predador natural de laranjas. As laranjeiras têm medo quando um macaco esquilo está por perto.",
  "description.black.bearry":
    "Seu lanche favorito - grandes mirtilos suculentos. Ele os devora com as mãos cheias!",
  "description.maneki.neko":
    "O gato convidativo. Puxe seu braço e a sorte virá",
  "description.easter.bunny": "Um item raro da Páscoa",
  "description.pablo.bunny": "Um coelho mágico da Páscoa",
  "description.foliant": "Um livro de feitiços.",
  "description.tiki.totem":
    "O Totem Tiki adiciona 0,1 de madeira a cada árvore que você corta.",
  "description.lunar.calendar":
    "As culturas agora seguem o ciclo lunar! Aumento de 10% na velocidade de crescimento das culturas.",
  "description.heart.davy.jones":
    "Quem o possui tem um imenso poder sobre os sete mares, pode procurar tesouros sem se cansar.",
  "description.treasure.map":
    "Um mapa encantado que guia seu portador para tesouros preciosos. +20% de lucro em itens encontrados na praia.",
  "description.genie.lamp":
    "Uma lâmpada mágica que contém um gênio que lhe concederá três desejos.",
  "description.basic.scarecrow":
    "Defensor exigente das plantas muito importantes de sua fazenda.",
  "description.scary.mike":
    "O sussurrador de vegetais e campeão de colheitas assustadoramente boas!",
  "description.laurie.chuckle.crow":
    "Com seu riso desconcertante, ela afasta os bicadores de suas culturas.",
  "description.immortal.pear":
    "Uma pera de longa duração que faz as árvores frutíferas durarem mais.",
  "description.bale":
    "O vizinho favorito das aves, oferecendo um refúgio confortável para as galinhas.",
  "description.sir.goldensnout":
    "Um membro da realeza, Sir Goldensnout infunde sua fazenda com uma prosperidade soberana graças ao seu esterco dourado.",
  "description.freya.fox":
    "Guardiã encantadora, ela estimula o crescimento das abóboras com seu charme místico. Colha abóboras abundantes sob seu olhar benevolente.",
  "description.queen.cornelia":
    "Comande o poder real da Rainha Cornelia e beneficie-se de um magnífico boost de área para sua produção de milho. +1 Milho.",
};

const boostEffectDescriptions: Record<BoostEffectDescriptions, string> = {
  "description.obie.boost": "As berinjelas crescem 25% mais rápido",
  "description.purple.trail.boost": "+0.2 Berinjela",
  "description.freya.fox.boost": "+0.5 Abóbora",
  "description.sir.goldensnout.boost": "+0.5 Culturas (AOE)",
  "description.maximus.boost": "+1 Berinjela",
  "description.basic.scarecrow.boost":
    "Os Girassóis, Batatas e Abóboras crescem 20% mais rápido",
  "description.scary.mike.boost":
    "+0.2 de rendimento em Cenouras, Repolhos, Beterrabas, Couve-flores e Pastinacas",
  "description.laurie.chuckle.crow.boost":
    "+0.2 de rendimento em Berinjelas, Milho, Rabanetes, Trigo e Couve",
  "description.bale.boost": "As galinhas adjacentes produzem +0.2 Ovos",
  "description.immortal.pear.boost": "+1 de rendimento",
  "description.treasure.map.boost": "+20% de SFL em Tesouro de Recompensa",
  "description.poppy.boost": "+0.1 Milho",
  "description.kernaldo.boost": "+25% de velocidade para o Milho",
  "description.grain.grinder.boost": "+20% de XP para o Bolo",
  "description.nana.boost": "+10% de velocidade para a Banana",
  "description.soil.krabby.boost": "+10% de velocidade para o Composto",
  "description.skill.shrimpy.boost": "+20% de XP para o Peixe",
  "description.iron.idol.boost": "+1 Ferro",
  "description.emerald.turtle.boost": "+0.5 AoE para todo Mineral",
  "description.tin.turtle.boost": "+0.1 AoE para as Pedras",
  "description.heart.of.davy.jones.boost": "Cavar 20 vezes mais por dia",
  "description.Karkinos.boost": "+0.1 Repolho",
  "description.mushroom.house.boost": "+0.2 Cogumelo Selvagem",
  "description.boost.gilded.swordfish": "+0,1 Ouro",
};

const bountyDescription: Record<BountyDescription, string> = {
  "description.clam.shell": "Uma concha de marisco.",
  "description.sea.cucumber": "Um pepino do mar.",
  "description.coral": "Um pedaço de coral, é bonito.",
  "description.crab": "Um caranguejo, cuidado com as pinças!",
  "description.starfish": "A estrela do mar.",
  "description.pirate.bounty":
    "Uma recompensa por um pirata. Vale muito dinheiro.",
  "description.wooden.compass":
    "Pode não ser de alta tecnologia, mas sempre o guiará na direção certa, você acredita em madeira?",
  "description.iron.compass":
    "Feche seu caminho para o tesouro! Este compasso é 'atraente', e não apenas para o Norte magnético!",
  "description.emerald.compass":
    "Guie seu caminho através dos mistérios luxuosos da vida! Este compasso não aponta apenas para o Norte, ele aponta para a opulência e grandeza!",
  "description.old.bottle":
    "Garrafa antiga de pirata, ressoando com histórias de aventuras em alto mar.",
  "description.pearl": "Brilha ao sol.",
  "description.pipi": "Plebidonax deltoides, encontrado no Oceano Pacífico.",
  "description.seaweed": "Algas marinhas.",
};

const buildingDescriptions: Record<BuildingDescriptions, string> = {
  // Buildings
  "description.water.well": "As culturas precisam de água!",
  "description.kitchen": "Aprimore suas habilidades culinárias",
  "description.compost.bin": "Produz isca e fertilizante regularmente.",
  "description.hen.house": "Desenvolva seu império avícola",
  "description.bakery": "Asse seus bolos favoritos",
  "description.turbo.composter":
    "Produz isca e fertilizante avançado regularmente.",
  "description.deli": "Satisfaça seu apetite com estas delícias!",
  "description.smoothie.shack": "Fresquinho e espremido!",
  "description.warehouse": "Aumenta seu estoque de sementes em 20%",
  "description.toolshed":
    "Aumenta seu estoque de ferramentas de oficina em 50%",
  "description.premium.composter":
    "Produz isca e fertilizante de nível especialista regularmente.",
  "description.town.center":
    "Reúna-se no Centro da Cidade para as últimas notícias",
  "description.market": "Compre e venda no Mercado dos Fazendeiros",
  "description.fire.pit":
    "Asse seus girassóis, alimente e suba de nível seu Bumpkin",
  "description.workbench": "Fabrique ferramentas para coletar recursos",
  "description.tent": "(Descontinuado)",
  "description.house": "Um lugar para descansar a sua cabeça",
};

const bumpkinItemBuff: Record<BumpkinItemBuff, string> = {
  "bumpkinItemBuff.chef.apron.boost": "+20% de lucro em bolos",
  "bumpkinItemBuff.fruit.picker.apron.boost": "+0.1 Fruta",
  "bumpkinItemBuff.angel.wings.boost": "Colheitas instantâneas",
  "bumpkinItemBuff.devil.wings.boost": "Colheitas instantâneas",
  "bumpkinItemBuff.eggplant.onesie.boost": "+0.1 Berinjela",
  "bumpkinItemBuff.golden.spatula.boost": "+10% XP",
  "bumpkinItemBuff.mushroom.hat.boost": "+0.1 Cogumelos",
  "bumpkinItemBuff.parsnip.boost": "+20% Pastinaga",
  "bumpkinItemBuff.sunflower.amulet.boost": "+10% Girassol",
  "bumpkinItemBuff.carrot.amulet.boost":
    "-20% Tempo de crescimento das cenouras",
  "bumpkinItemBuff.beetroot.amulet.boost": "+20% Beterraba",
  "bumpkinItemBuff.green.amulet.boost":
    "Chance de multiplicar colheitas por 10",
  "bumpkinItemBuff.Luna.s.hat.boost": "-50% Tempo de cozimento",
  "bumpkinItemBuff.infernal.pitchfork.boost": "+3 Colheitas",
  "bumpkinItemBuff.cattlegrim.boost": "+0.25 Produtos animais",
  "bumpkinItemBuff.corn.onesie.boost": "+0.1 Milho",
  "bumpkinItemBuff.sunflower.rod.boost": "10% de chance de +1 Peixe",
  "bumpkinItemBuff.trident.boost": "20% de chance de +1 Peixe",
  "bumpkinItemBuff.bucket.o.worms.boost": "+1 Minhoca",
  "bumpkinItemBuff.luminous.anglerfish.topper.boost": "+50% XP de pesca",
  "bumpkinItemBuff.angler.waders.boost": "+10 Limite de pesca",
  "bumpkinItemBuff.ancient.rod.boost": "Pesca sem vara",
  "bumpkinItemBuff.banana.amulet.boost": "+0.5 Bananas",
  "bumpkinItemBuff.banana.boost": "+20% de velocidade para bananas",
  "bumpkinItemBuff.deep.sea.helm": "3x mais chances de Maravilhas Marinhas",
};

const bumpkinPartRequirements: Record<BumpkinPartRequirements, string> = {
  "part.hair": "Cabelo é necessário",
  "part.body": "Corpo é necessário",
  "part.shoes": "Sapatos são necessários",
  "part.shirt": "Camisa é necessária",
  "part.pants": "Calças são necessárias",
  "part.background": "Fundo é necessário",
};

const bumpkinSkillsDescription: Record<BumpkinSkillsDescription, string> = {
  // Crops
  "description.green.thumb": "As culturas produzem 5% a mais",
  "description.cultivator": "As culturas crescem 5% mais rápido",
  "description.master.farmer": "As culturas produzem 10% a mais",
  "description.golden.flowers": "Chance de obter ouro ao colher girassóis",
  "description.happy.crop": "Chance de obter o dobro de colheitas",
  // Trees
  "description.lumberjack": "As árvores derrubam 10% a mais",
  "description.tree.hugger": "As árvores crescem 20% mais rápido",
  "description.tough.tree": "Chance de obter 3x mais madeira ao cortar árvores",
  "description.money.tree": "Chance de obter SFL ao cortar árvores",
  // Rocks
  "description.digger": "As pedras derrubam 10% a mais",
  "description.coal.face": "As pedras se regeneram 20% mais rápido",
  "description.seeker": "Atrai Monstros das Rochas",
  "description.gold.rush": "Chance de obter 2,5x mais ouro",
  // Cooking
  "description.rush.hour": "Cozinhe as refeições 10% mais rápido",
  "description.kitchen.hand": "As refeições rendem 5% mais experiência",
  "description.michelin.stars": "Comida de alta qualidade, rende 5% mais SFL",
  "description.curer":
    "Consumir produtos do Deli adiciona 15% mais experiência",
  // Animals
  "description.stable.hand": "Os animais produzem 10% mais rápido",
  "description.free.range": "Os animais produzem 10% a mais",
  "description.horse.whisperer": "Aumenta as chances de obter mutantes",
  "description.buckaroo": "Chance de obter colheitas duplas",
};

const bumpkinTrade: Record<BumpkinTrade, string> = {
  "bumpkinTrade.askPrice": "Preço pedido:",
  "bumpkinTrade.purchased": "Parabéns, seu anúncio foi comprado!",
  "bumpkinTrade.plaza":
    "Vá até a praça para que outros jogadores possam negociar com você",
  "bumpkinTrade.lvl": "Você precisa ser nível 10 para negociar",
  "bumpkinTrade.noTradeLs": "Você não tem nenhum anúncio de comércio listado.",
  "bumpkinTrade.sell":
    "Venda seus recursos para outros jogadores em troca de SFL.",
  "bumpkinTrade.list": "Listar comércio",
  "bumpkinTrade.like.list": "O que você gostaria de listar",
};

const buyFarmHand: Record<BuyFarmHand, string> = {
  "buyFarmHand.howdyBumpkin": "Olá Bumpkin.",
  "buyFarmHand.confirmBuyAdditional":
    "Tem certeza de que deseja comprar um Bumpkin adicional?",
  "buyFarmHand.farmhandCoupon": "1 Cupom de Ajudante de Fazenda",
  "buyFarmHand.adoptBumpkin": "Adotar um Bumpkin",
  "buyFarmHand.additionalBumpkinsInfo":
    "Bumpkins adicionais podem ser usados para equipar acessórios e impulsionar sua fazenda.",
  "buyFarmHand.notEnoughSpace": "Espaço insuficiente - atualize sua ilha",
  "buyFarmHand.buyBumpkin": "Comprar Bumpkin",
};

const claimAchievement: Record<ClaimAchievement, string> = {
  "claimAchievement.noBumpkin": "Vous n'avez pas de Bumpkin",
  "claimAchievement.alreadyHave": "Vous avez déjà cet accomplissement",
  "claimAchievement.requirementsNotMet": "Vous ne répondez pas aux exigences",
};

const chat: Record<Chat, string> = {
  "chat.Loading": "Carregando",
  "chat.Fail": "Falha na conexão",
  "chat.mute": "Você está silenciado",
  "chat.again": "Você poderá conversar novamente em",
  "chat.Kicked": "Expulso",
};

const chickenWinner: Record<ChickenWinner, string> = {
  "chicken.winner.playagain": "clique aqui para jogar novamente",
};

const choresStart: Record<ChoresStart, string> = {
  "chores.harvestFields": "Colher os campos",
  "chores.earnSfl": "Ganhar {{amount}} SFL",
  "chores.harvestFieldsIntro":
    "Estes campos não vão se arar sozinhos. Colha 3 Girassóis.",
  "chores.earnSflIntro":
    "Se você quer ter sucesso na agricultura, comece vendendo girassóis, comprando sementes e colhendo os lucros.",
  "chores.reachLevel": "Alcançar o nível 2",
  "chores.reachLevelIntro":
    "Se você quer subir de nível e desbloquear novas habilidades, comece cozinhando comida e comendo-a.",
  "chores.chopTrees": "Cortar 3 árvores",
  "chores.helpWithTrees":
    "Meus velhos ossos não são mais o que eram, você pode me ajudar com essas malditas árvores para cortar? Nosso ferreiro local ajudará você a fabricar ferramentas.",
};

const chumDetails: Record<ChumDetails, string> = {
  "chumDetails.gold":
    "O ouro cintilante pode ser visto a 100 milhas de distância",
  "chumDetails.iron":
    "Um brilho cintilante, visível de todos os ângulos ao crepúsculo",
  "chumDetails.stone": "Talvez jogar algumas pedras atraia alguns peixes",
  "chumDetails.egg": "Hmm, não tenho certeza se os peixes gostam de ovos...",
  "chumDetails.sunflower":
    "Uma isca ensolarada e vibrante para peixes curiosos.",
  "chumDetails.potato": "As batatas são um banquete incomum para os peixes.",
  "chumDetails.pumpkin":
    "Os peixes podem se intrigar com o brilho laranja das abóboras.",
  "chumDetails.carrot": "Melhor usado com minhocas para pegar anchovas!",
  "chumDetails.cabbage": "Uma tentação folhosa para herbívoros submarinos.",
  "chumDetails.beetroot":
    "Beterrabas, o deleite subaquático para peixes ousados.",
  "chumDetails.cauliflower":
    "Os peixes podem achar os floretes estranhamente atraentes.",
  "chumDetails.parsnip": "Uma isca terrosa e radicular para peixes curiosos.",
  "chumDetails.eggplant":
    "Berinjelas: uma aventura aquática para peixes ousados.",
  "chumDetails.corn": "Milho na espiga – um petisco estranho, mas intrigante.",
  "chumDetails.radish": "Rabanetes, o tesouro enterrado para aquáticos.",
  "chumDetails.wheat":
    "Trigo, um deleite granuloso para forrageadores submarinos.",
  "chumDetails.kale": "Uma surpresa verde para peixes curiosos.",
  "chumDetails.blueberry":
    "Frequentemente confundido por peixes azuis como parceiros potenciais.",
  "chumDetails.orange":
    "Laranjas, uma curiosidade cítrica para criaturas marinhas.",
  "chumDetails.apple": "Maçãs – um enigma crocante sob as ondas.",
  "chumDetails.banana": "Mais leve que a água!",
  "chumDetails.seaweed": "Um sabor do oceano em um lanche folhoso subaquático.",
  "chumDetails.crab": "Um pedaço tentador para um peixe curioso sob o mar.",
  "chumDetails.anchovy":
    "Anchovas, misteriosamente atraentes para os fora-da-lei do mar.",
  "chumDetails.redSnapper": "Um mistério escondido nas profundezas do oceano.",
  "chumDetails.tuna": "O que é grande o suficiente para comer um atum?",
  "chumDetails.squid": "Desperte uma arraia com seu petisco favorito!",
  "chumDetails.wood": "Madeira. Uma escolha interessante....",
};

const community: Record<Community, string> = {
  "community.toast": "O texto do toast está vazio",
  "community.url": "Insira a URL do seu repositório",
  "comunity.Travel": "Viaje para ilhas construídas pela comunidade",
};

const compostDescription: Record<CompostDescription, string> = {
  "compost.fruitfulBlend":
    "A Mistura Frutífera aumenta o rendimento de cada fruta em +0.1",
  "compost.sproutMix":
    "A Mistura de Brotos aumenta o rendimento das suas colheitas em +0.2",
  "compost.sproutMixBoosted":
    "A Mistura de Brotos reforçada aumenta o rendimento das suas colheitas em +0.4",
  "compost.rapidRoot":
    "Raiz Rápida reduz o tempo de crescimento das colheitas em 50%",
};

const composterDescription: Record<ComposterDescription, string> = {
  "composter.compostBin": "Detalhes sobre o Caixote de Composto...",
  "composter.turboComposter": "Detalhes sobre o Compostor Turbo...",
  "composter.premiumComposter": "Detalhes sobre o Compostor Premium...",
};

const confirmSkill: Record<ConfirmSkill, string> = {
  "confirm.skillClaim": "Tem certeza de que deseja reivindicar a habilidade ?",
};

const confirmationTerms: Record<ConfirmationTerms, string> = {
  "confirmation.sellCrops": "Tem certeza de que deseja vender",
};

const conversations: Record<Conversations, string> = {
  "hank-intro.headline": "Ajudar um velho?",
  "hank-intro.one": "Olá Bumpkin! Bem-vindo ao nosso pequeno paraíso.",
  "hank-intro.two":
    "Trabalho nesta terra há cinquenta anos, mas bem que preciso de ajuda.",
  "hank-intro.three":
    "Posso te ensinar o básico da agricultura, desde que você me ajude nas tarefas diárias.",
  "hank-crafting.headline": "Faça um espantalho",
  "hank-crafting.one":
    "Hmm, essas colheitas estão crescendo terrivelmente devagar. Não tenho tempo para esperar.",
  "hank-crafting.two":
    "Faça um espantalho para acelerar o crescimento de suas colheitas.",
  "betty-intro.headline": "Como desenvolver sua fazenda",
  "betty-intro.one": "Ei, ei! Bem-vindo ao meu mercado.",
  "betty-intro.two":
    "Traga-me sua melhor colheita, e eu lhe darei um bom preço!",
  "betty-intro.three":
    "Precisa de sementes? De batatas a pastinacas, eu cuido de tudo!",
  "betty.market-intro.one":
    "Ei, Bumpkin! Aqui é a Betty do mercado de fazendeiros. Viajo entre as ilhas para comprar colheitas e vender sementes frescas.",
  "betty.market-intro.two":
    "Boa notícia: você acabou de encontrar uma pá novinha em folha! Má notícia: estamos enfrentando uma escassez de colheitas.",
  "betty.market-intro.three":
    "Por tempo limitado, estou oferecendo o dobro do dinheiro para cada colheita que você me trouxer.",
  "betty.market-intro.four":
    "Colha esses Girassóis e vamos começar a construir seu império agrícola.",
  "bruce-intro.headline": "Introdução à culinária",
  "bruce-intro.one": "Sou o proprietário deste charmoso bistrô.",
  "bruce-intro.two":
    "Traga-me recursos e eu cozinharei o quanto de comida você quiser!",
  "bruce-intro.three":
    "Olá fazendeiro! Posso identificar um Bumpkin faminto a quilômetros de distância.",
  "blacksmith-intro.headline": "Corte, corte, corte.",
  "blacksmith-intro.one":
    "Sou um mestre das ferramentas, e com os recursos certos, posso fazer tudo o que você precisa... incluindo mais ferramentas!",
  "pete.first-expansion.one":
    "Parabéns, Bumpkin! Sua fazenda está crescendo mais rápido que um feijão mágico em uma tempestade!",
  "pete.first-expansion.two":
    "Com cada expansão, você encontrará coisas legais como recursos especiais, novas árvores e mais para coletar!",
  "pete.first-expansion.three":
    "Fique de olho nos presentes surpresa dos generosos goblins enquanto explora, eles não são apenas mestres da construção, mas também doadores de segredos astutos!",
  "pete.first-expansion.four": "Parabéns, Bumpkin! Continue o bom trabalho.",
  "pete.blacksmith.one": "Hmm, essas colheitas estão crescendo lentamente.",
  "pete.blacksmith.two":
    "Sunflower Land está cheia de itens mágicos que você pode fazer para melhorar suas habilidades agrícolas.",
  "pete.blacksmith.three":
    "Vá até a Bancada de Trabalho e faça um espantalho para acelerar o crescimento desses Girassóis.",
  "pete.levelthree.one":
    "Parabéns, seu polegar verde está realmente brilhando!",
  "pete.levelthree.two":
    "É hora de ir até a Plaza, onde suas habilidades agrícolas podem brilhar ainda mais.",
  "pete.levelthree.three":
    "Na plaza, você pode fazer entregas para obter recompensas, criar itens mágicos e negociar com outros jogadores.",
  "pete.levelthree.four":
    "Você pode viajar clicando no ícone do mundo no canto inferior esquerdo.",
  "pete.help.zero":
    "Visite o Fire Pit, cozinhe comida e coma para subir de nível.",
  "pete.help.one":
    "À medida que você sobe de nível, desbloqueará novas áreas para explorar. A primeira é a Plaza do Bumpkin... minha casa!",
  "pete.help.two":
    "Aqui, você pode fazer entregas para obter recompensas, criar itens mágicos e negociar com outros jogadores.",
  "sunflowerLand.explorationPrompt": "Ei viajante! Pronto para explorar?",
  "sunflowerLand.islandDescription":
    "Sunflower Land está cheia de ilhas emocionantes onde você pode completar entregas, criar NFTs raros e até mesmo cavar em busca de tesouros!",
  "sunflowerLand.opportunitiesDescription":
    "Diferentes locais trazem diferentes oportunidades para gastar seus recursos arduamente ganhos.",
  "sunflowerLand.returnHomeInstruction":
    "A qualquer momento, clique no botão de viagem para voltar para casa.",
  "grimbly.expansion.one":
    "Saudações, jovem fazendeiro! Sou Grimbly, um goblin construtor experiente.",
  "grimbly.expansion.two":
    "Com os materiais certos e minhas habilidades artesanais ancestrais, podemos transformar sua ilha em uma obra-prima.",
  "luna.portalNoAccess":
    "Hmm, este portal apareceu do nada. O que isso poderia significar?",
  "luna.portals": "Portais",
  "luna.rewards": "Recompensas",
  "luna.travel":
    "Viaje para esses portais construídos por jogadores e ganhe recompensas.",
  "luna.coming": "Em breve...",
  "mayor.plaza.changeNamePrompt":
    "Você quer mudar seu nome? Infelizmente, não posso fazer isso por você agora, a papelada é demais para mim.",
  "mayor.plaza.intro":
    "Oi, companheiro Bumpkin, parece que ainda não nos apresentamos.",
  "mayor.plaza.role":
    "Eu sou o Prefeito desta cidade! Eu me encarrego de garantir que todos estejam felizes. Também me certifico de que todos tenham um nome!",
  "mayor.plaza.fixNamePrompt":
    "Você ainda não tem um nome? Bem, podemos consertar isso! Você quer que eu prepare os documentos?",
  "mayor.plaza.enterUsernamePrompt": "Digite seu nome de usuário:",
  "mayor.plaza.processingUsernames":
    "Estou processando nomes de usuário na ordem do ID da fazenda. Você poderá escolher seu nome de usuário a partir de:",
  "mayor.plaza.usernameValidation":
    "Por favor, esteja ciente de que os nomes de usuário devem seguir o nosso",
  "mayor.plaza.niceToMeetYou": "Prazer em conhecê-lo, !",
  "mayor.plaza.congratulations":
    "Parabéns , seus documentos estão completos. Até logo!",
  "mayor.plaza.enjoyYourStay":
    "Espero que você aproveite sua estadia em Sunflower Land! Se precisar de mim novamente, basta voltar até mim!",
};

const cropFruitDescriptions: Record<CropFruitDescriptions, string> = {
  // Crops
  "description.sunflower": "Uma flor ensolarada",
  "description.potato": "Mais saudável do que você pensa.",
  "description.pumpkin": "Há mais na abóbora do que apenas torta.",
  "description.carrot": "São bons para os seus olhos!",
  "description.cabbage": "Antigamente um luxo, agora um alimento para muitos.",
  "description.beetroot": "Bom contra a ressaca!",
  "description.cauliflower": "Excelente substituto para o arroz!",
  "description.parsnip": "Não confunda com cenouras.",
  "description.eggplant": "Obra comestível da natureza.",
  "description.corn":
    "Grãos de milho ensolarados, tesouro de verão da natureza.",
  "description.radish": "Demora, mas vale a pena esperar!",
  "description.wheat": "A cultura mais colhida no mundo.",
  "description.kale": "Um superalimento para os Bumpkins!",

  // Fruits
  "description.blueberry": "A fraqueza de um Goblin",
  "description.orange": "Vitamina C para manter seu Bumpkin saudável",
  "description.apple": "Perfeito para uma torta de maçã caseira",
  "description.banana": "Oh, banana!",

  // Exotic Crops
  "description.white.carrot": "Uma cenoura pálida com raízes pálidas",
  "description.warty.goblin.pumpkin":
    "Uma abóbora caprichosa e coberta de verrugas",
  "description.adirondack.potato": "Uma batata robusta, estilo Adirondack!",
  "description.purple.cauliflower": "Couve-flor roxa real",
  "description.chiogga": "Uma beterraba arco-íris!",
  "description.golden.helios": "Grandeza banhada pelo sol!",
  "description.black.magic": "Uma flor escura e misteriosa!",
};

const deliveryitem: Record<Deliveryitem, string> = {
  "deliveryitem.loading": "Carregando",
  "deliveryitem.inventory": "Inventário:",
  "deliveryitem.itemsToDeliver": "Itens para entregar:",
  "deliveryitem.deliverToWallet": "Entregar na sua carteira",
  "deliveryitem.viewOnOpenSea":
    "Uma vez entregues, você poderá visualizar seus itens no OpenSea.",
  "deliveryitem.deliver": "Entregar",
};

const defaultDialogue: Record<DefaultDialogue, string> = {
  "defaultDialogue.intro":
    "Olá, amigo! Estou aqui para ver se você tem o que eu preciso.",
  "defaultDialogue.positiveDelivery":
    "Oh, fantástico! Você trouxe exatamente o que eu preciso. Obrigado!",
  "defaultDialogue.negativeDelivery":
    "Oh não! Parece que você não tem o que eu preciso. Sem problemas, no entanto. Continue explorando, e encontraremos outra oportunidade.",
  "defaultDialogue.noOrder":
    "Não há nenhum pedido ativo para ser realizado para mim no momento.",
};

const decorationDescriptions: Record<DecorationDescriptions, string> = {
  // Décorations
  "description.wicker.man":
    "Junte as mãos e forme uma corrente, a sombra do Homem de Vime se levantará novamente",
  "description.golden bonsai": "Os goblins também gostam de bonsais",
  "description.christmas.bear": "O favorito do Papai Noel",
  "description.war.skull": "Decore a terra com os ossos dos seus inimigos.",
  "description.war.tombstone": "R.I.P",
  "description.white.tulips": "Afaste o cheiro dos goblins.",
  "description.potted.sunflower": "Ilumine sua terra.",
  "description.potted.potato":
    "O sangue de batata corre nas veias dos seus Bumpkins.",
  "description.potted.pumpkin": "Abóboras para os Bumpkins",
  "description.cactus": "Economiza água e deixa sua fazenda linda!",
  "description.basic.bear":
    "Um urso básico. Use-o no Goblin Retreat para construir um urso!",
  "description.bonnies.tombstone":
    "Um acréscimo assustador para qualquer fazenda, a lápide humana de Bonnie vai lhe dar arrepios.",
  "description.grubnashs.tombstone":
    "Adicione um charme travesso com a lápide de goblin de Grubnash.",
  "description.town.sign": "Exiba com orgulho o ID da sua fazenda!",
  "description.dirt.path":
    "Mantenha suas botas de fazendeiro limpas com um caminho bem pisoteado.",
  "description.bush": "O que está escondido nos arbustos?",
  "description.fence": "Adicione um toque de charme rústico à sua fazenda.",
  "description.stone.fence":
    "Adote a elegância atemporal de uma cerca de pedra.",
  "description.pine.tree": "Alto e poderoso, um sonho coberto de agulhas.",
  "description.shrub":
    "Melhore o paisagismo do seu jogo com um arbusto magnífico",
  "description.field.maple":
    "Um encantador de pequeno porte que estende suas folhas como um delicado dossel verde.",
  "description.red.maple":
    "Folhagem flamejante e um coração cheio de calor outonal.",
  "description.golden.maple": "Brilha com suas folhas douradas cintilantes.",
  "description.crimson.cap":
    "Um cogumelo vibrante e imponente, o cogumelo gigante Crimson Cap trará vida à sua fazenda.",
  "description.toadstool.seat":
    "Sente-se e relaxe no assento de cogumelo fantasioso Toadstool.",
  "description.chestnut.fungi.stool":
    "O banco de cogumelo Chestnut Fungi é um acréscimo robusto e rústico para qualquer fazenda.",
  "description.mahogany.cap":
    "Adicione um toque de sofisticação com o cogumelo gigante Mahogany Cap.",
  "description.candles":
    "Encante sua fazenda com chamas espectrais tremulantes durante a Noite das Bruxas.",
  "description.haunted.stump":
    "Invoque espíritos e adicione um charme inquietante à sua fazenda.",
  "description.spooky.tree":
    "Um acréscimo divertido e assombrado à decoração da sua fazenda!",
  "description.observer":
    "Um olho errante perpétuo, sempre vigilante e constantemente observador!",
  "description.crow.rock": "Um corvo empoleirado em uma rocha misteriosa.",
  "description.mini.corn.maze":
    "Uma lembrança do amado labirinto da temporada de Halloween de 2023.",
  "description.lifeguard.ring":
    "Mantenha-se à tona com estilo, seu salvador à beira-mar!",
  "description.surfboard":
    "Surfe nas ondas do encantamento, a alegria da praia em uma prancha!",
  "description.hideaway.herman":
    "Herman está aqui para se esconder, mas sempre dá uma espiada para uma festa!",
  "description.shifty.sheldon":
    "Sheldon é astuto, sempre se esgueirando para a próxima surpresa arenosa!",
  "description.tiki.torch": "Ilumine a noite, vibrações tropicais brilhantes!",
  "description.beach.umbrella":
    "Sombra, abrigo e estilo praiano em um conjunto ensolarado!",
  "description.magic.bean": "O que vai crescer?",
  "description.giant.potato": "Uma batata gigante.",
  "description.giant.pumpkin": "Uma abóbora gigante.",
  "description.giant.cabbage": "Um repolho gigante.",
  "description.chef.bear": "Todo chef precisa de uma mãozinha",
  "description.construction.bear": "Sempre construindo em um mercado em baixa",
  "description.angel.bear": "É hora de transcender a agricultura camponesa",
  "description.badass.bear": "Nada fica no seu caminho.",
  "description.bear.trap": "É uma armadilha!",
  "description.brilliant.bear": "Pura brilhância!",
  "description.classy.bear": "Mais SFL do que você sabe o que fazer!",
  "description.farmer.bear": "Nada como um dia duro de trabalho!",
  "description.rich.bear": "Uma posse preciosa",
  "description.sunflower.bear": "O queridinho da cultura de um urso",
  "description.beta.bear": "Um urso encontrado em eventos especiais de teste",
  "description.rainbow.artist.bear":
    "O proprietário é um magnífico artista urso!",
  "description.devil.bear": "Melhor conhecer o Diabo do que não conhecê-lo",
  "description.collectible.bear":
    "Um urso de coleção, sempre em perfeito estado!",
  "description.cyborg.bear": "Hasta la vista, urso",
  "description.christmas.snow.globe":
    "Faça a neve girar e assista-a ganhar vida",
  "description.kraken.tentacle":
    "Mergulhe no mistério das profundezas do mar! Esta tentáculo evoca contos de lendas oceânicas antigas e maravilhas aquáticas.",
  "description.kraken.head":
    "Mergulhe no mistério das profundezas do mar! Esta cabeça evoca contos de lendas oceânicas antigas e maravilhas aquáticas.",
  "description.abandoned.bear": "Um urso que foi deixado para trás na ilha.",
  "description.turtle.bear":
    "Suficientemente tartaruga para o clube das tartarugas.",
  "description.trex.skull": "Um crânio de T-Rex! Incrível!",
  "description.sunflower.coin": "Uma moeda feita de girassóis.",
  "description.skeleton.king.staff": "Viva o Rei Esqueleto!",
  "description.lifeguard.bear":
    "O urso salva-vidas está aqui para salvar o dia!",
  "description.snorkel.bear": "O urso com snorkel adora nadar.",
  "description.parasaur.skull": "Um crânio de parasaur!",
  "description.goblin.bear": "Um urso goblin. É um pouco assustador.",
  "description.golden.bear.head": "Assustador, mas legal.",
  "description.pirate.bear": "Argh, marujo! Me dê um abraço!",
  "description.galleon": "Um barco de brinquedo, ainda em bom estado.",
  "description.dinosaur.bone":
    "Um osso de dinossauro! Que tipo de criatura era?",
  "description.human.bear":
    "Um urso humano. Ainda mais assustador que um urso goblin.",
  "description.flamingo":
    "Representa um símbolo do amor e beleza, de pé alto e confiante.",
  "description.blossom.tree":
    "Suas pétalas delicadas simbolizam a beleza e fragilidade do amor.",
  "description.heart.balloons":
    "Use-os como decorações para ocasiões românticas.",
  "description.whale.bear":
    "Tem um corpo redondo e peludo como um urso, mas com as barbatanas, cauda e espiráculo de uma baleia.",
  "description.valentine.bear": "Para aqueles que amam.",
  "description.easter.bear": "Como um coelho pode botar ovos?",
  "description.easter.bush": "O que tem dentro?",
  "description.giant.carrot":
    "Uma cenoura gigante se ergue, projetando sombras divertidas, enquanto os coelhos observam com admiração.",
  "description.beach.ball":
    "Uma bola saltitante traz vibrações de praia, afastando o tédio.",
  "description.palm.tree":
    "Alta, praiana, sombreada e elegante, as palmeiras fazem as ondas balançarem.",

  //other
  "description.sunflower.amulet": "Rendimento de girassóis aumentado em 10%",
  "description.carrot.amulet": "Cenouras crescem 20% mais rápido",
  "description.betroot.amulet": "Rendimento de beterrabas aumentado em 20%",
  "description.green.amulet": "Chance de um rendimento de colheita 10x",
  "description.warrior.shirt": "A marca de um verdadeiro guerreiro",
  "description.warrior.pants": "Proteja suas coxas",
  "description.warrior.helmet": "Imune a flechas",
  "description.sunflower.shield":
    "Um herói de Sunflower Land. Sementes de girassol grátis!",
  "description.skull.hat": "Um chapéu raro para o seu Bumpkin.",
  "description.undead.rooster": "",
  "description.sunflower.statue": "Um símbolo do token sagrado",
  "description.potato.statue": "O flex do hustler de batatas OG",
  "description.christmas.tree":
    "Receba um largue aéreo do Papai Noel no dia de Natal",
  "description.gnome": "Um gnomo de sorte",
  "description.homeless.tent": "Uma tenda agradável e confortável",
  "description.sunflower.tombstone": "Em memória dos agricultores de girassóis",
  "description.sunflower.rock": "O jogo que quebrou o Polygon",
  "description.goblin.crown": "Invoque o líder dos Goblins",
  "description.fountain": "Uma fonte relaxante para a sua fazenda",
  "description.nyon.statue": "Em memória de Nyon Lann",
  "description.farmer.bath":
    "Um banho perfumado de beterraba para os agricultores",
  "description.woody.Beaver": "Aumenta as colheitas de madeira em 20%",
  "description.apprentice.beaver": "As árvores se regeneram 50% mais rápido",
  "description.foreman.beaver": "Corte árvores sem machados",
  "description.egg.basket": "Dá acesso à caça aos ovos de Páscoa",
  "description.mysterious.head":
    "Uma estátua que se acredita proteger os agricultores",
  "description.tunnel.mole": "Aumenta em 25% a produção das minas de pedra",
  "description.rocky.the.mole": "Aumenta em 25% a produção das minas de ferro",
  "description.nugget": "Aumenta em 25% a produção das minas de ouro",
  "description.rock.golem": "10% de chance de obter 3x mais pedra",
  "description.chef.apron": "Dá 20% de SFL a mais ao vender bolos",
  "description.chef.hat": "A coroa de um padeiro lendário!",
  "description.nancy":
    "Afasta alguns corvos. As culturas crescem 15% mais rápido",
  "description.scarecrow":
    "Um espantalho de goblin. Rendimento de colheita aumentado em 20%",
  "description.kuebiko":
    "Até o comerciante tem medo deste espantalho. Sementes são grátis",
  "description.golden.cauliflower": "Dobra o rendimento do couve-flor",
  "description.mysterious.parsnip": "Pastinacas crescem 50% mais rápido",
  "description.carrot.sword":
    "Aumenta a chance de aparecer uma colheita mutante",
  "description.chicken.coop": "Colete 2x mais ovos",
  "description.farm.cat": "Afasta os ratos",
  "description.farm.dog": "Conduza as ovelhas com seu cão de fazenda",
  "description.gold.egg": "Alimente as galinhas sem precisar de trigo",
  "description.easter.bunny": "Ganhe 20% mais cenouras",
  "description.rooster": "Dobra a chance de aparecer um frango mutante",
  "description.chiken": "Produz ovos. Necessita de trigo para alimentação",
  "description.cow": "Produz leite. Necessita de trigo para alimentação",
  "description.pig": "Produz adubo. Necessita de trigo para alimentação",
  "description.sheep": "Produz lã. Necessita de trigo para alimentação",
  "description.basic.land": "Um pedaço de terra básico",
  "description.crop.plot": "Um terreno vazio para plantar culturas",
  "description.gold.rock": "Uma rocha explorável para coletar ouro",
  "description.iron.rock": "Uma rocha explorável para coletar ferro",
  "description.stone.rock": "Uma rocha explorável para coletar pedra",
  "description.ruby.rock": "Uma rocha minerável para coletar rubi",
  "description.flower.bed": "Um terreno vazio para plantar flores",
  "description.tree": "Uma árvore para cortar e coletar madeira",
  "description.fruit.patch": "Um terreno vazio para plantar frutas",
  "description.boulder": "Uma rocha mítica que pode soltar minerais raros",
  "description.catch.the.kraken.banner":
    "O Kraken está aqui! A marca de um participante da temporada 'Capture o Kraken'.",
  "description.luminous.lantern":
    "Uma lanterna de papel luminosa que ilumina o caminho.",
  "description.radiance.lantern":
    "Uma lanterna de papel radiante que brilha com uma luz poderosa.",
  "description.ocean.lantern":
    "Uma lanterna de papel ondulada que balança ao ritmo das marés.",
  "description.solar.lantern":
    "Capturando a essência vibrante dos girassóis, a Lanterna Solar emite um brilho quente e radiante.",
  "description.aurora.lantern":
    "Uma lanterna de papel que transforma qualquer espaço em um país das maravilhas mágico.",
  "description.dawn.umbrella":
    "Mantenha essas berinjelas secas durante os dias chuvosos com o Guarda-chuva Amanhecer.",
  "description.eggplant.grill":
    "Cozinhe com a Grelha de Berinjela, perfeita para qualquer refeição ao ar livre.",
  "description.giant.dawn.mushroom":
    "O Cogumelo Gigante Amanhecer é um adição majestosa e mágica para qualquer fazenda.",
  "description.shroom.glow":
    "Ilumine sua fazenda com o brilho encantador do Shroom Glow.",
  "description.clementine":
    "O Gnome Clementine é um companheiro alegre para suas aventuras agrícolas.",
  "description.cobalt":
    "O Gnome Cobalt adiciona um toque de cor à sua fazenda com seu chapéu vibrante.",
  "description.hoot": "Hoo hoo! Você resolveu meu enigma?",
  "description.genie.bear": "Exatamente o que eu desejava!",
  "description.betty.lantern":
    "Parece tão real! Eu me pergunto como eles fizeram isso.",
  "description.bumpkin.lantern":
    "Ao se aproximar, você ouve sussurros de um Bumpkin vivo... assustador!",
  "description.eggplant.bear": "A marca de uma baleia de berinjela generosa.",
  "description.goblin.lantern": "Uma lanterna de aparência assustadora",
  "description.dawn.flower":
    "Abrace a beleza radiante da Flor do Amanhecer enquanto suas delicadas pétalas cintilam com a primeira luz do dia",
  "description.kernaldo.bonus": "+25% de velocidade de crescimento do milho",
  "description.white.crow": "Um corvo branco misterioso e etéreo",
  "description.sapo.docuras": "Uma verdadeira delícia!",
  "description.sapo.travessuras": "Oh oh... alguém foi travesso",
  "description.walrus":
    "Com suas presas confiáveis e amor pelas profundezas, ele garante que você pesque um peixe extra a cada vez",
  "description.alba":
    "Com seus instintos afiados, ela garante um pequeno extra na sua pescaria. 50% de chance de +1 Peixe Básico!",
  "description.knowledge.crab":
    "O Caranguejo do Conhecimento dobra o efeito do seu Mix de Germinação, tornando seus tesouros do solo tão ricos quanto o saque marinho!",
  "description.anchor":
    "'Ancore com esta joia náutica, tornando cada local digno do mar e espirrando de estilo!",
  "description.rubber.ducky":
    "Flutue na diversão com este patinho clássico, trazendo alegria borbulhante a cada canto!",
  "description.arcade.token":
    "Um token ganho em minijogos e aventuras. Pode ser trocado por recompensas.",
  "description.bumpkin.nutcracker": "Uma decoração festiva de 2023.",
  "description.festive.tree":
    "Uma árvore festiva disponível a cada temporada de festas. Será que é grande o suficiente para o Papai Noel ver?",
  "description.white.festive.fox":
    "A bênção da Raposa Branca habita as fazendas generosas",
  "description.grinxs.hammer":
    "O martelo mágico de Grinx, o lendário ferreiro goblin.",
  "description.angelfish":
    "A beleza celestial aquática, adornada com uma paleta de cores vibrantes.",
  "description.halibut":
    "O habitante do fundo do oceano plano, mestre do disfarce em camuflagem arenosa.",
  "description.parrotFish":
    "Um caleidoscópio de cores sob as ondas, este peixe é uma obra de arte viva da natureza.",
  "description.Farmhand": "Um ajudante de fazenda útil",
  "description.Beehive":
    "Uma colmeia movimentada, produzindo mel de flores em crescimento ativo; 10% de chance na colheita do mel de invocar um enxame de abelhas que irá polinizar todas as culturas em crescimento com um impulso de +0.2!",

  // Banners
  "description.goblin.war.banner": "Um sinal de lealdade à causa dos Goblins",
  "description.human.war.banner": "Um sinal de lealdade à causa dos Humanos",
};

const delivery: Record<Delivery, string> = {
  "delivery.panel.one":
    "Hmm, parece que sua fazenda não terá os recursos de que preciso. Alcance ",
  "delivery.panel.two": "expansões e volte para me ver.",
  "delivery.panel.three": "Entrega: Nenhum pedido selecionado",
  "delivery.panel.four":
    "Estou esperando o início da nova temporada. Volte para me ver nessa hora!",
  "delivery.ressource": "Quer que eu entregue recursos?",
  "delivery.feed": "Não é de graça, eu tenho uma tribo para alimentar!",
  "delivery.fee": "Eu vou levar 30% dos recursos para o ",
};

const deliveryHelp: Record<DeliveryHelp, string> = {
  "deliveryHelp.pumpkinSoup":
    "Reúna os ingredientes e pegue um barco para a Pumpkin Plaza para entregar pedidos aos Bumpkins em troca de uma recompensa!",
  "deliveryHelp.hammer":
    "Expanda sua terra para desbloquear mais locais e acelerar os pedidos de entrega",
  "deliveryHelp.axe":
    "Complete suas tarefas e encontre Hank na Plaza para reivindicar suas recompensas.",
  "deliveryHelp.chest":
    "Construa relacionamentos com os Bumpkins completando vários pedidos para desbloquear recompensas bônus. (Em breve)  ",
};

const depositWallet: Record<DepositWallet, string> = {
  "deposit.errorLoadingBalances": "Ocorreu um erro ao carregar seus saldos.",
  "deposit.yourPersonalWallet": "Sua Carteira Pessoal",
  "deposit.farmWillReceive": "Sua fazenda receberá:",
  "deposit.depositDidNotArrive": "O depósito não chegou?",
  "deposit.goblinTaxInfo":
    "Quando os jogadores retiram SFL, um Imposto de Goblin é aplicado.",
  "deposit.applied": "é aplicado.",
  "deposit.sendToFarm": "Enviar para a fazenda",
  "deposit.toDepositLevelUp":
    "Para depositar itens, você deve primeiro subir de nível",
  "deposit.level": "Nível 3",
  "deposit.noSflOrCollectibles": "Nenhum SFL ou item colecionável encontrado!",
  "deposit.farmAdresse": "Endereço da fazenda:",
  "question.depositSFLItems":
    "Gostaria de depositar colecionáveis, vestíveis ou SFL do Sunflower Land?",
};

const detail: Record<Detail, string> = {
  "detail.how.item": "Como obter este item?",
  "detail.Claim.Reward": "Reivindicar Recompensa",
  "detail.basket.empty": "Seu cesto está vazio!",
  "detail.view.item": "Ver item em,",
};

const discordBonus: Record<DiscordBonus, string> = {
  "discord.bonus.niceHat": "Uau, que chapéu legal!",
  "discord.bonus.attentionEvents":
    "Não se esqueça de prestar atenção aos eventos especiais e brindes no Discord para não perder nada.",
  "discord.bonus.bonusReward": "Recompensa Bônus",
  "discord.bonus.payAttention":
    "Preste atenção aos eventos especiais e brindes no Discord para não perder nada.",
  "discord.bonus.enjoyCommunity":
    "Esperamos que você esteja gostando de fazer parte da nossa comunidade!",
  "discord.bonus.claimGift": "Reivindicar Presente",
  "discord.bonus.communityInfo":
    "Você sabia que há mais de 100.000 jogadores em nossa vibrante comunidade no Discord?",
  "discord.bonus.farmingTips":
    "Se você está procurando dicas e conselhos sobre agricultura, este é o lugar perfeito.",
  "discord.bonus.freeGift":
    "O melhor... todos que se juntam recebem um presente grátis!",
  "discord.bonus.connect": "Conectar ao Discord",
};

const donation: Record<Donation, string> = {
  "donation.one":
    "Esta foi uma iniciativa artística comunitária e as doações são muito apreciadas!",
  "donation.amount": "Quantia em MATIC",
  "donation.donate": "Doar",
  "donation.donating": "Doando",
  "donation.Ty": "Obrigado!",
  "donation.wrong": "Oh não! Algo deu errado!",
};

const errorAndAccess: Record<ErrorAndAccess, string> = {
  "errorAndAccess.warning": "Aviso",
  "errorAndAccess.blocked.betaTestersOnly":
    "Acesso limitado apenas para testadores beta",
  "errorAndAccess.denied.message": "Você ainda não tem acesso ao jogo.",
  "errorAndAccess.instructions.part1": "Certifique-se de ter se juntado ao ",
  "errorAndAccess.sflDiscord": "Discord do Sunflower Land",
  "errorAndAccess.instructions.part2":
    ", vá para o canal #verify e obtenha a função de 'fazendeiro'.",
  "errorAndAccess.try.again": "Tentar Novamente  ",
};

const errorTerms: Record<ErrorTerms, string> = {
  "error.blocked.betaTestersOnly": "Apenas para testadores beta!",
  "error.congestion.one":
    "Estamos fazendo o nosso melhor, mas parece que a Polygon está recebendo muito tráfego ou você perdeu sua conexão.",
  "error.congestion.two":
    "Se este erro continuar, tente mudar o seu RPC do Metamask",
  "error.connection.one":
    "Parece que não conseguimos completar esta solicitação.",
  "error.connection.two": "Pode ser um simples problema de conexão.",
  "error.connection.three":
    "Você pode clicar em atualizar para tentar novamente.",
  "error.connection.four":
    "Se o problema persistir, você pode pedir ajuda entrando em contato com nossa equipe de suporte ou juntando-se ao nosso discord para perguntar à nossa comunidade.",
  "error.diagnostic.info": "Informações de Diagnóstico",
  "error.forbidden.goblinVillage":
    "Você não tem permissão para visitar a Vila dos Goblins!",
  "error.multipleDevices.one": "Múltiplos dispositivos abertos",
  "error.multipleDevices.two":
    "Por favor, feche outras abas do navegador ou dispositivos que você esteja usando.",
  "error.multipleWallets.one": "Múltiplas Carteiras",
  "error.multipleWallets.two":
    "Parece que você tem várias carteiras instaladas. Isso pode causar comportamentos inesperados. Tente desativar todas as carteiras exceto uma.",
  "error.polygonRPC":
    "Por favor, tente novamente ou verifique suas configurações de RPC da Polygon.",
  "error.toManyRequest.one": "Muitos pedidos!",
  "error.toManyRequest.two":
    "Parece que você tem estado ocupado! Por favor, tente novamente mais tarde.",
  "error.Web3NotFound": "Web3 Não Encontrado",
  "error.wentWrong": "Algo deu errado!",
  "error.noBumpkin": "Bumpkin não definido",
  "error.clock.not.synced": "Relógio não sincronizado",
  "error.polygon.cant.connect": "Não é possível conectar-se à Polygon",
  "error.composterNotExist": "Composteira não existe",
  "error.composterNotProducing": "Composteira não está produzindo",
  "error.composterAlreadyDone": "Composteira já concluída",
  "error.composterAlreadyBoosted": "Já impulsionado",
  "error.missingEggs": "Ovos faltando",
  "error.noBumpkin1": "Você não tem um Bumpkin",
  "error.insufficientSFL": "SFL insuficiente",
  "error.insufficientSpaceForChickens":
    "Espaço insuficiente para mais galinhas",
  "error.noBumpkin2": "Você não tem um Bumpkin",
  "error.dailyAttemptsExhausted": "Tentativas diárias esgotadas",
  "error.missingRod": "Vara de pesca faltando",
  "error.missingBait": "Isca faltando: {bait}",
  "error.alreadyCasted": "Já lançado",
  "error.unsupportedChum": "{chum} não é uma isca suportada",
  "error.insufficientChum": "Isca insuficiente:",
  "error.alr.composter": "O compostor já está compostando",
  "error.no.alr.composter": "O compostor não está pronto para produzir",
  "error.missing": "Requisitos ausentes",
  "error.no.ready": "O composto não está pronto",
  "error.noprod.composter": "O compostor não está produzindo nada",
  "error.buildingNotExist": "O edifício não existe",
  "error.buildingNotCooking": "O edifício não está cozinhando nada",
  "error.recipeNotReady": "A receita não está pronta",
  "error.npcsNotExist": "Os NPCs não existem",
  "error.noDiscoveryAvailable": "Nenhuma descoberta disponível",
  "error.obsessionAlreadyCompleted": "Esta obsessão já foi completada",
  "error.collectibleNotInInventory": "Você não tem o colecionável necessário",
  "error.wearableNotInWardrobe": "Você não tem o vestuário necessário",
  "error.requiredBuildingNotExist": "O edifício necessário não existe",
  "error.cookingInProgress": "Cozimento já em andamento",
  "error.insufficientIngredient": "Ingrediente insuficiente:",
  "error.itemNotExist": "O item não existe",
  "error.notEnoughStock": "Estoque insuficiente",
  "error.tooEarly": "Muito cedo",
  "error.tooLate": "Muito tarde",
  "error.decorationCollides": "Decoração colide",
  "error.idAlreadyExists": "O ID já existe",
};

const exoticShopItems: Record<ExoticShopItems, string> = {
  "exoticShopItems.line1":
    "Nossa loja de feijões está fechando as portas, pois nossos feijões estão embarcando em uma nova jornada com um cientista maluco.",
  "exoticShopItems.line2":
    "Obrigado por fazer parte da nossa comunidade de amantes de leguminosas.",
  "exoticShopItems.line3": "Atenciosamente,",
  "exoticShopItems.line4": "Equipe dos Feijões",
};

const festivetree: Record<FestiveTree, string> = {
  "festivetree.greedyBumpkin": "Bumpkin ganancioso detectado",
  "festivetree.alreadyGifted":
    "Esta árvore já foi presenteada. Aguarde até o próximo Natal para mais festividades.",
  "festivetree.notFestiveSeason":
    "Não é a temporada festiva. Volte mais tarde.",
};

const fishDescriptions: Record<FishDescriptions, string> = {
  // Fish
  "description.anchovy.one":
    "O acrobata em miniatura do oceano, sempre em movimento!",
  "description.anchovy.two": "Pequeno peixe, grande sabor!",
  "description.butterflyfish.one":
    "Um peixe elegante, exibindo suas listras vivas e elegantes.",
  "description.butterflyfish.two": "Nade nas cores e sabores!",
  "description.blowfish.one":
    "O cômico redondo e inchado do mar, garantido para fazer você sorrir.",
  "description.blowfish.two": "Jante com perigo, uma surpresa espinhosa!",
  "description.clownfish.one":
    "O palhaço submarino, vestindo um smoking tangerina e charme de palhaço.",
  "description.clownfish.two": "Sem piadas, apenas pura delícia!",
  "description.seabass.one":
    "Seu amigo 'não tão emocionante' com escamas prateadas - uma captura básica!",
  "description.seabass.two": "O essencial da culinária à beira-mar!",
  "description.seahorse.one":
    "O dançarino lento do oceano, balançando graciosamente no balé aquático.",
  "description.seahorse.two": "Delicado, raro e surpreendentemente saboroso!",
  "description.horsemackerel.one":
    "Um corredor com um casaco brilhante, sempre correndo pelas ondas.",
  "description.horsemackerel.two": "Galope através dos sabores a cada mordida!",
  "description.squid.one":
    "O enigma das profundezas com tentáculos para aguçar sua curiosidade.",
  "description.squid.two": "Tinte seu caminho para sabores requintados!",
  "description.redsnapper.one":
    "Uma captura digna do seu peso em ouro, vestida em vermelho carmesim ardente.",
  "description.redsnapper.two":
    "Mergulhe em oceanos de sabores ricos e picantes!",
  "description.morayeel.one":
    "Um rastejador sorrateiro nos cantos sombreados do oceano.",
  "description.morayeel.two": "Escorregadio, saboroso e sensacional!",
  "description.oliveflounder.one":
    "O mestre do camuflagem do fundo do mar, sempre confundido com a multidão.",
  "description.oliveflounder.two": "Tateie na riqueza e sabor!",
  "description.napoleanfish.one":
    "Conheça o peixe com complexo de Napoleão - pequeno, mas real!",
  "description.napoleanfish.two": "Conquiste sua fome com esta captura!",
  "description.surgeonfish.one":
    "O guerreiro neon do oceano, armado com uma atitude afiada.",
  "description.surgeonfish.two": "Opere suas papilas gustativas com precisão!",
  "description.zebraturkeyfish.one":
    "Listras, espinhos e uma disposição picante, este peixe é um verdadeiro espetáculo!",
  "description.zebraturkeyfish.two":
    "Listrado, espinhoso e espetacularmente saboroso!",
  "description.ray.one":
    "O planador submarino, uma bela asa serena através das ondas.",
  "description.ray.two": "Plane sobre um mundo de sabores ricos!",
  "description.hammerheadshark.one":
    "Conheça o tubarão com cabeça de martelo, com uma cabeça para negócios e um corpo para aventura!",
  "description.hammerheadshark.two": "Um choque frontal com sabor!",
  "description.tuna.one":
    "O corredor musculoso do oceano, pronto para uma corrida fantástica de nadadeiras!",
  "description.tuna.two": "Um titã de sabor em cada fatia!",
  "description.mahimahi.one":
    "Um peixe que acredita em viver a vida em cores com barbatanas douradas.",
  "description.mahimahi.two": "Duplo o nome, dupla a delícia!",
  "description.bluemarlin.one":
    "Uma lenda oceânica, o marlim com uma atitude tão profunda quanto o mar.",
  "description.bluemarlin.two": "Direcione seu apetite com esta captura real!",
  "description.oarfish.one":
    "O longo e longo dele - um viajante oceânico enigmático.",
  "description.oarfish.two": "Rema para um sabor lendário!",
  "description.footballfish.one":
    "O MVP das profundezas, uma estrela bioluminescente pronta para jogar!",
  "description.footballfish.two": "Marque um touchdown em sabor!",
  "description.sunfish.one":
    "O banhista solar do oceano, se bronzeando sob os holofotes com barbatanas bem erguidas.",
  "description.sunfish.two": "Relaxe no brilho de seu sabor delicioso!",
  "description.coelacanth.one":
    "Um vestígio pré-histórico, com um gosto pelo passado e pelo presente.",
  "description.coelacanth.two":
    "Um sabor pré-histórico que resistiu ao teste do tempo!",
  "description.whaleshark.one":
    "O gigante gentil das profundezas, filtrando os tesouros do buffet do oceano.",
  "description.whaleshark.two":
    "Um banquete colossal para desejos monumentais!",
  "description.barredknifejaw.one":
    "Um peixe fora-da-lei com listras em preto e branco e um coração de ouro.",
  "description.barredknifejaw.two": "Corte a fome com sabores afiados!",
  "description.sawshark.one":
    "Com um focinho em forma de serra, é o carpinteiro do oceano, sempre na ponta!",
  "description.sawshark.two": "Sabor de ponta das profundezas!",
  "description.whiteshark.one":
    "O tubarão com um sorriso mortal, reinando sobre os mares com uma intensidade de nadadeira!",
  "description.whiteshark.two": "Mergulhe em um oceano de sabor emocionante!",

  // Marine Marvels
  "description.twilight.anglerfish":
    "Um peixe-pescador das profundezas com uma luz embutida, guiando seu caminho na escuridão.",
  "description.starlight.tuna":
    "Um atum que brilha mais que as estrelas, pronto para iluminar sua coleção.",
  "description.radiant.ray":
    "Uma arraia que prefere brilhar na escuridão, com um segredo cintilante para compartilhar.",
  "description.phantom.barracuda":
    "Um peixe-barracuda elusivo e espectral das profundezas, se escondendo nas sombras.",
  "description.gilded.swordfish":
    "Um peixe-espada com escamas que brilham como ouro, a captura suprema!",
};

const fishermanModal: Record<FishermanModal, string> = {
  "fishermanModal.attractFish": "Atraia os peixes jogando isca na água.",
  "fishermanModal.royChallenge":
    "Ahoy, amigos da ilha! Eu sou o Reelin' Roy, seu fiel pescador insular, e me desafiei a pegar todos os peixes sob o sol!",
  "fishermanModal.fishBenefits":
    "Os peixes são ótimos para comer, entregar e reivindicar recompensas!",
  "fishermanModal.baitAndResources":
    "Traga-me iscas e recursos e pegaremos os tesouros mais raros que o oceano tem a oferecer!",
  "fishermanModal.crazyHappening":
    "Uau, algo louco está acontecendo... É uma frenesi de peixes!",
  "fishermanModal.bonusFish":
    "Corra, você receberá um peixe bônus para cada captura!",
  "fishermanModal.dailyLimitReached":
    "Você atingiu seu limite diário de pesca de {dailyFishingMax}.",
  "fishermanModal.needCraftRod":
    "Você precisa primeiro fabricar uma vara de pescar.",
  "fishermanModal.craft.beach": "Fabricar na praia",
  "fishermanModal.zero.available": "0 Disponível",
  "fishermanmodal.greetingPart1": "Ahoy, companheiros da ilha! Eu sou ",
  "fishermanmodal.greetingPart2":
    ", seu confiável pescador da ilha, e estabeleci um grande desafio - coletar todos os peixes sob o sol!",
};

const fishermanQuest: Record<FishermanQuest, string> = {
  "fishermanQuest.Ohno": "Oh não! Ele escapou",
  "fishermanQuest.Newfish": "Novo peixe",
};

const fishingChallengeIntro: Record<FishingChallengeIntro, string> = {
  "fishingChallengeIntro.powerfulCatch":
    "Uma captura poderosa espera por você!",
  "fishingChallengeIntro.useStrength": "Use toda a sua força para trazê-la.",
  "fishingChallengeIntro.stopGreenBar":
    "Pare a barra verde no peixe para ter sucesso.",
  "fishingChallengeIntro.beQuick":
    "Seja rápido - 3 tentativas falhadas, e ele escapa!",
};

const fishingGuide: Record<FishingGuide, string> = {
  "fishingGuide.catch.rod": "Fabrique uma vara e reúna iscas para pescar.",
  "fishingGuide.bait.earn":
    "As iscas podem ser obtidas compostando ou fabricando iscas.",
  "fishingGuide.eat.fish":
    "Coma peixe para evoluir seu Bumpkin ou realize entregas de peixes para obter recompensas.",
  "fishingGuide.discover.fish":
    "Explore as águas para descobrir peixes raros, cumprir missões e desbloquear recompensas únicas no Codex.",
  "fishingGuide.condition":
    "Acompanhe as mudanças das marés; algumas espécies de peixes só estão disponíveis em certas condições.",
  "fishingGuide.bait.chum":
    "Experimente com diferentes tipos de iscas e chum para maximizar suas chances de capturar várias espécies de peixes.",
  "fishingGuide.legendery.fish":
    "Cuidado com os peixes lendários; eles exigem habilidade e força excepcionais para serem capturados.",
};

const fishingQuests: Record<FishingQuests, string> = {
  "quest.basic.fish": "Capture cada peixe básico",
  "quest.advanced.fish": "Capture cada peixe avançado",
  "quest.all.fish": "Descubra cada peixe básico, avançado e especialista",
  "quest.300.fish": "Capture 300 peixes",
  "quest.1500.fish": "Capture 1500 peixes",
  "quest.marine.marvel": "Capture cada Maravilha Marinha",
  "quest.5.fish": "Pegue 5 de cada peixe",
};

const flowerbedguide: Record<Flowerbedguide, string> = {
  "flowerbedguide.craftRod": "Crie uma vara e reúna isca para pescar.",
  "flowerbedguide.earnBait":
    "A isca pode ser obtida através de compostagem ou fabricando iscas.",
  "flowerbedguide.eatFish":
    "Coma peixe para subir de nível no seu Bumpkin ou realize entregas de peixe para recompensas.",
  "flowerbedguide.exploreWaters":
    "Explore as águas para descobrir peixes raros, completar missões e desbloquear recompensas únicas no Codex.",
  "flowerbedguide.tidePatterns":
    "Acompanhe os padrões de maré em mudança; certas espécies de peixes só estão disponíveis em determinadas condições.",
  "flowerbedguide.experimentBait":
    "Experimente diferentes tipos de isca e combinações de chum para maximizar suas chances de capturar várias espécies de peixes.",
  "flowerbedguide.legendaryFish":
    "Cuidado com os peixes lendários; eles exigem habilidade e força excepcionais para serem capturados.",
};

const foodDescriptions: Record<FoodDescriptions, string> = {
  // Fire Pit
  "description.pumpkin.soup": "Uma sopa cremosa que os goblins adoram",
  "description.mashed.potato": "Minha vida é a batata.",
  "description.bumpkin.broth":
    "Um caldo nutritivo para reabastecer seu Bumpkin",
  "description.boiled.eggs": "Ovos cozidos são perfeitos para o café da manhã",
  "description.kale.stew": "Um impulsionador perfeito para o seu Bumpkin!",
  "description.mushroom.soup": "Aqueça a alma do seu Bumpkin.",
  "description.reindeer.carrot": "Rudolph não consegue parar de comê-las!",
  "description.kale.omelette": "Um café da manhã saudável",
  "description.cabbers.mash": "Repolho e batatas amassadas",
  "description.popcorn": "Um lanche caseiro clássico e crocante.",
  "description.gumbo":
    "Um pote cheio de magia! Cada colherada é um desfile de Mardi Gras!",

  // Kitchen
  "description.roast.veggies": "Até os goblins precisam comer seus vegetais!",
  "description.bumpkin.salad": "Mantenha seu Bumpkin saudável!",
  "description.goblins.treat": "Os goblins adoram!",
  "description.cauliflower.burger": "Chamando todos os amantes de couve-flor!",
  "description.club.sandwich":
    "Recheado com cenouras e sementes de girassol torradas",
  "description.mushroom.jacket.potatoes":
    "Cubra essas batatas com o que você tiver!",
  "description.sunflower.crunch": "Um deleite crocante. Tente não queimar.",
  "description.bumpkin.roast": "Um prato tradicional de Bumpkin",
  "description.goblin.brunch": "Um prato tradicional dos goblins",
  "description.fruit.salad": "Salada de frutas, yum yum",
  "description.bumpkin.ganoush": "Um patê de berinjela assada e picante.",
  "description.chowder":
    "O deleite dos marinheiros em uma tigela! Mergulhe, há um tesouro lá dentro!",
  "description.pancakes": "Um ótimo começo de dia para um Bumpkin!",

  // Bakery
  "description.apple.pie": "A famosa receita de Bumpkin Betty",
  "description.kale.mushroom.pie": "Uma receita tradicional de Sapphiron",
  "description.cornbread": "Um pão firme e dourado, fresco da fazenda.",
  "description.sunflower.cake": "Bolo de girassol",
  "description.potato.cake": "Bolo de batata",
  "description.pumpkin.cake": "Bolo de abóbora",
  "description.carrot.cake": "Bolo de cenoura",
  "description.cabbage.cake": "Bolo de repolho",
  "description.beetroot.cake": "Bolo de beterraba",
  "description.cauliflower.cake": "Bolo de couve-flor",
  "description.parsnip.cake": "Bolo de pastinaga",
  "description.radish.cake": "Bolo de rabanete",
  "description.wheat.cake": "Bolo de trigo",
  "description.honey.cake": "Um bolo delicioso!",
  "description.eggplant.cake": "Uma surpresa doce deliciosa da fazenda.",
  "description.orange.cake": "Bom que não estamos cozinhando maçãs, não é?",
  "description.pirate.cake":
    "Perfeito para festas de aniversário com tema de pirata.",

  // Deli
  "description.blueberry.jam":
    "Os goblins fariam qualquer coisa por essa geleia",
  "description.fermented.carrots": "Tem cenouras sobrando?",
  "description.sauerkraut": "Acabou o repolho chato!",
  "description.fancy.fries": "Repolho e batatas esmagadas",
  "description.fermented.fish":
    "Audácia deliciosa! Liberte o Viking em você a cada mordida!",

  // Smoothie Shack
  "description.apple.juice": "Uma bebida refrescante e crocante",
  "description.orange.juice":
    "O suco de laranja combina perfeitamente com um Club Sandwich",
  "description.purple.smoothie": "Você mal consegue sentir o gosto do repolho",
  "description.power.smoothie":
    "Bebida oficial da Sociedade de Levantamento de Peso dos Bumpkins",
  "description.bumpkin.detox": "Lave os pecados do dia anterior",
  "description.banana.blast":
    "O combustível frutado final para quem tem pele para o poder!",

  // Unused foods
  "description.roasted.cauliflower": "O favorito dos goblins",
  "description.radish.pie": "Odiada pelos humanos, adorada pelos goblins",
};

const garbageCollector: Record<GarbageCollector, string> = {
  "garbageCollector.welcome": "Bem-vindo à minha humilde loja.",
  "garbageCollector.description":
    "Sou o Comerciante de Lixo, e comprarei tudo o que você tiver - desde que seja lixo.",
  "garbageCollector.continue": "Continuar",
};

const gameDescriptions: Record<GameDescriptions, string> = {
  // Quest Items
  "description.goblin.key": "A chave do goblin",
  "description.sunflower.key": "A chave do girassol",
  "description.ancient.goblin.sword": "Uma espada antiga de goblin",
  "description.ancient.human.warhammer": "Um martelo de guerra humano antigo",

  // Coupons
  "description.community.coin":
    "Uma moeda valiosa que pode ser trocada por recompensas",
  "description.bud.seedling": "Uma muda para trocar por um NFT Bud gratuito",
  "description.gold.pass":
    "Um passe exclusivo que permite ao seu portador fabricar NFTs raros, negociar, retirar e acessar conteúdo bônus.",
  "description.rapid.growth":
    "Para aplicar em uma cultura para que ela cresça duas vezes mais rápido",
  "description.bud.ticket":
    "Um lugar garantido para cunhar um Bud no lançamento dos NFTs Sunflower Land Buds.",
  "description.potion.ticket":
    "Uma recompensa da Casa das Poções. Use isso para comprar itens com Garth.",
  "description.trading.ticket": "Trocas gratuitas! Woohoo!",
  "description.block.buck": "Um token valioso em Sunflower Land!",
  "description.beta.pass": "Acesso antecipado a recursos para testes.",
  "description.war.bond": "A marca de um verdadeiro guerreiro",
  "description.allegiance": "Uma demonstração de lealdade",
  "description.jack.o.lantern": "Um item especial do evento de Halloween",
  "description.golden.crop": "Uma cultura dourada brilhante",
  "description.red.envelope": "Uau, você tem sorte!",
  "description.love.letter": "Expresse sentimentos de amor",
  "description.solar.flare.ticket":
    "Um bilhete usado durante a Temporada de Solar Flare",
  "description.dawn.breaker.ticket":
    "Um bilhete usado durante a Temporada de Dawn Breaker",
  "description.crow.feather":
    "Um bilhete usado durante a Temporada de Witches' Eve",
  "description.mermaid.scale":
    "Um bilhete usado durante a Temporada Catch the Kraken",
  "description.sunflower.supporter":
    "A marca de um verdadeiro apoiador do jogo!",

  // Easter Items
  "description.egg.basket": "Evento de Páscoa",
  "description.blue.egg": "Um ovo de Páscoa azul",
  "description.orange.egg": "Um ovo de Páscoa laranja",
  "description.green.egg": "Um ovo de Páscoa verde",
  "description.yellow.egg": "Um ovo de Páscoa amarelo",
  "description.red.egg": "Um ovo de Páscoa vermelho",
  "description.pink.egg": "Um ovo de Páscoa rosa",
  "description.purple.egg": "Um ovo de Páscoa roxo",

  //class
  "description.sunflowerAmulet": "Rendimento de girassol aumentado em 10%.",
  "description.carrotAmulet": "Cenouras crescem 20% mais rápido.",
  "description.beetrootAmulet": "Rendimento de beterraba aumentado em 20%.",
  "description.greenAmulet":
    "Chance de obter um rendimento dez vezes maior para as colheitas.",
  "description.warriorShirt": "A marca de um verdadeiro guerreiro.",
  "description.warriorPants": "Proteja suas coxas!",
  "description.warriorHelmet": "Imune a flechas.",
  "description.sunflowerShield":
    "Um herói da Terra do Girassol. Sementes de girassol grátis!",
  "description.skullHat": "Uma recompensa pelos seus esforços de guerra.",
  "description.warSkull": "Três inimigos derrotados.",
  "description.warTombstone": "Uma recompensa pelos seus esforços de guerra.",

  //Home
  "description.homeOwnerPainting": "Uma pintura do proprietário desta casa.",
};

const gameTerms: Record<GameTerms, string> = {
  bumpkinLvl: "Nível do Bumpkin",
  dailyLim: "Limite diário de SFL",
  gobSwarm: "Enxame de Goblins!",
  potions: "Poções",
  sflDiscord: "Servidor Discord Sunflower Land",
  "auction.winner": "Vencedor do Leilão!",
  "farm.banned": "Esta fazenda está banida",
  "proof.of.humanity": "Prova de Humanidade",
  "no.sfl": "Nenhum token SFL encontrado",
  "granting.wish": "Realizando seu desejo",
  "new.delivery.in": "Novas entregas disponíveis em: ",
  bumpkinBuzz: "Bumpkin Buzz",
};

const getContent: Record<GetContent, string> = {
  "getContent.error": "Erro!",
  "getContent.joining": "Juntando-se",
  "getContent.congratulations": "Parabéns!",
  "getContent.accessGranted":
    "Agora você tem acesso. Confira o canal no Discord",
  "getContent.connectToDiscord":
    "Você precisa estar conectado ao Discord para se juntar a um canal restrito.",
  "getContent.connect": "Conectar",
  "getContent.getAccess": "Obtenha acesso aos grupos restritos no Discord",
  "getContent.requires": "Requer um",
  "getContent.join": "Junte-se",
};

const getInputErrorMessage: Record<GetInputErrorMessage, string> = {
  "getInputErrorMessage.minimum": "O lance mínimo é de ",
  "getInputErrorMessage.sfl": "SFL",
  "getInputErrorMessage.s": "s",
  "getInputErrorMessage.no.sfl": "Você não tem SFL suficiente",
  "getInputErrorMessage.yes.sfl": "Você não tem o suficiente",
  "getInputErrorMessage.auction": "O leilão terminou",
  "getInputErrorMessage.place.bid":
    "Tem certeza de que deseja fazer este lance?",
  "getInputErrorMessage.cannot.bid":
    "Os lances não podem ser alterados após serem colocados.",
};

const goblin_messages: Record<GOBLIN_MESSAGES, string> = {
  "goblinMessages.msg1": "Ei você! Humano! Traga-me comida senão...",
  "goblinMessages.msg2":
    "Estou sempre com fome, você tem algum petisco apetitoso para mim?",
  "goblinMessages.msg3": "Não importa o que seja, apenas me dê comida!",
  "goblinMessages.msg4":
    "Se você não me der nada para comer, eu posso começar a te beliscar.",
  "goblinMessages.msg5":
    "Ouvi dizer que a comida humana é a melhor, traga-me algo!",
  "goblinMessages.msg6": "Ei, você tem comida que não vai me deixar doente?",
  "goblinMessages.msg7":
    "Estou começando a me cansar de comer sempre a mesma coisa, você tem algo diferente?",
  "goblinMessages.msg8": "Estou com fome de algo novo, você tem algo exótico?",
  "goblinMessages.msg9":
    "Oi, você tem lanches para compartilhar? Prometo que não vou roubá-los... talvez.",
  "goblinMessages.msg10": "Não importa o que seja, apenas me dê comida!",
};

const goldpassModal: Record<GoldPassModal, string> = {
  "goldPass.unlockPower": "Desbloqueie o poder do Gold Pass:",
  "goldPass.craftNFTs": "Fabricar NFTs raros",
  "goldPass.trade": "Trocar com outros jogadores",
  "goldPass.participateAuction": "Participar de leilões",
  "goldPass.withdrawTransferNFTs": "Retirar e transferir NFTs",
  "goldPass.accessRestrictedAreas": "Acessar áreas restritas",
  "goldPass.readMore": "Saiba mais",
  "common.noThanks": "Não, obrigado",
  "goldPass.buyNow": "Compre agora $",
  "goldPass.priceInMatic": "O preço é pago em equivalente $MATIC de $",
};

const goldTooth: Record<GoldTooth, string> = {
  "goldTooth.intro.part1":
    "Arrr, companheiros! A área de escavação de tesouros está cheia de riquezas e aventuras, e em breve abrirá suas portas para vocês, fazendeiros audaciosos!",
  "goldTooth.intro.part2":
    "Estejam prontos para se juntar à minha tripulação, pois a caça ao tesouro começa em breve!",
};

const guideTerms: Record<GuideTerms, string> = {
  "guide.intro":
    "De começos modestos à maestria na agricultura, este guia cobre tudo!",
  "gathering.description.one":
    "Para prosperar em Sunflower Land, dominar a arte da coleta de recursos é essencial. Comece equipando as ferramentas apropriadas para coletar diferentes recursos. Use o machado confiável para derrubar árvores e obter madeira. Para fabricar ferramentas, visite a Bancada local e troque seus SFL/recursos pela ferramenta desejada.",
  "gathering.description.two":
    "À medida que você progride e coleta recursos suficientes, você desbloqueará a capacidade de expandir seu território. Expandir seu terreno abre novos horizontes em Sunflower Land. As expansões de terreno revelam uma mina de recursos, incluindo solos férteis para plantar culturas, árvores majestosas, depósitos de pedras preciosas, veias de ferro valioso, depósitos de ouro cintilantes, parcelas de frutas deliciosas e muito mais.",
  "gathering.description.three":
    "Não se esqueça de que a coleta de recursos e a expansão do terreno são a espinha dorsal da sua jornada agrícola. Aceite os desafios e recompensas que acompanham cada etapa e veja sua Sunflower Land prosperar com uma abundância de recursos e inúmeras possibilidades.",

  "crops.description.one":
    "Em Sunflower Land, as culturas desempenham um papel crucial na sua jornada para a prosperidade. Ao plantar e colher culturas, você pode ganhar SFL (Sunflower Token) ou usá-las para fabricar receitas e itens valiosos no jogo.",
  "crops.description.two":
    "Para cultivar, você precisa comprar as respectivas sementes na loja do jogo. Cada cultura tem um tempo de crescimento diferente, variando de apenas um minuto para Girassóis a 36 horas para Couve. Uma vez que as culturas estejam completamente desenvolvidas, você pode colhê-las e colher as recompensas.",
  "crops.description.three":
    "Lembre-se de que, à medida que você expande seu terreno e progride no jogo, mais e mais culturas estarão disponíveis, oferecendo maiores oportunidades de ganhar SFL e explorar o vasto potencial da economia agrícola de Sunflower Land. Então, mãos à obra, plante essas sementes e veja suas culturas prosperarem enquanto você colhe seu caminho para o sucesso!",

  "building.description.one":
    "Explore a diversidade de edifícios disponíveis à medida que você progride em Sunflower Land. De galinheiros a oficinas e além, cada estrutura traz benefícios únicos para sua fazenda. Aproveite esses edifícios para otimizar suas operações agrícolas, aumentar a produtividade e desbloquear novas possibilidades. Planeje cuidadosamente seu layout e aproveite as recompensas que acompanham a construção de uma fazenda próspera em Sunflower Land.",
  "building.description.two":
    "Em Sunflower Land, os edifícios são a pedra angular da sua jornada agrícola. Para acessar o menu de edifícios, clique no ícone de Inventário e selecione a aba Edifícios. Escolha a estrutura desejada e volte para a tela da sua fazenda. Encontre um espaço aberto, marcado como grama, e confirme o local. Aguarde o temporizador terminar, e seu novo edifício estará pronto para uso. Os edifícios oferecem vários benefícios e desbloqueiam recursos de jogo emocionantes. Posicione-os estrategicamente em sua fazenda para maximizar a eficiência e observe seu império agrícola crescer e prosperar.",

  "cooking.description.one":
    "Cozinhar permite alimentar seu Bumpkin e ajudá-lo a ganhar pontos de experiência (XP) valiosos. Usando as culturas que você colheu, você pode preparar deliciosas receitas em diferentes edifícios dedicados à culinária.",
  "cooking.description.two":
    "A partir do Fogo, cada fazenda tem acesso a instalações básicas de cozinha desde o início. No entanto, à medida que você progride, pode desbloquear edifícios mais avançados, como a Cozinha, a Padaria, a Charcutaria e o Quiosque de Smoothies, cada um oferecendo uma maior variedade de receitas e delícias culinárias.",
  "cooking.description.three":
    "Para cozinhar, basta selecionar um edifício e escolher uma receita que você deseja preparar. A receita fornecerá detalhes sobre os ingredientes necessários, os XP ganhos ao consumir e o tempo de preparação. Depois de iniciar o processo de cozimento, monitore o temporizador para saber quando a comida estará pronta para ser coletada.",
  "cooking.description.four":
    "Uma vez que a comida esteja pronta, basta coletá-la no edifício clicando nele, e ela será automaticamente adicionada ao seu inventário. Em seguida, você pode interagir com seu personagem Bumpkin NPC na fazenda e dar a ele a comida preparada, o que o ajudará a ganhar XP e a progredir ainda mais no jogo.",
  "cooking.description.five":
    "Experimente com diferentes receitas, desbloqueie novos edifícios e descubra a alegria de cozinhar alimentando seu Bumpkin e embarcando em uma deliciosa aventura culinária em Sunflower Land.",

  "animals.description.one":
    "As galinhas em Sunflower Land são um adorável acréscimo à sua fazenda, servindo como fonte de ovos que podem ser usados em várias receitas e criações artesanais. Para começar com as galinhas, você precisará alcançar o nível de Bumpkin 9 e construir um Galinheiro. A partir daí, você tem a opção de comprar galinhas ou colocar as que já possui. Basta arrastá-las e soltá-las em sua fazenda, assim como você faz para colocar edifícios. Em uma fazenda padrão, cada Galinheiro pode abrigar até 10 galinhas, e se você possui o Galinheiro SFT, esse limite se estende para 15.",
  "animals.description.two":
    "Cada galinha tem um indicador acima de sua cabeça, mostrando seu humor ou necessidades atuais. Isso pode variar de fome, cansaço, felicidade ou prontidão para chocar. Para manter suas galinhas felizes e produtivas, alimente-as selecionando trigo em seu inventário e interagindo com a galinha. A alimentação inicia o temporizador dos ovos, que leva 48 horas para que os ovos estejam prontos para chocar. Uma vez que os ovos estejam prontos, visite sua fazenda, verifique o ícone acima de cada galinha e interaja com elas para descobrir que tipo de ovo chocou. De vez em quando, você pode até descobrir galinhas mutantes raras, que oferecem benefícios especiais, como produção de ovos mais rápida, rendimento aumentado ou redução do consumo de alimento.",
  "animals.description.three":
    "Alimentar suas galinhas e coletar seus ovos adiciona um elemento dinâmico e gratificante à sua fazenda em Sunflower Land. Experimente com receitas, use os ovos em seus projetos de fabricação e aproveite as surpresas oferecidas pelas galinhas mutantes raras. Construa uma operação avícola próspera e colha os frutos do seu trabalho árduo ao se imergir no encantador mundo das galinhas em Sunflower Land.",

  "crafting.description.one":
    "Em Sunflower Land, a criação de itens NFT (tokens não fungíveis) é um aspecto crucial para aumentar sua produção agrícola e acelerar sua progressão. Esses itens especiais oferecem vários bônus, como aumentos no crescimento das culturas, melhorias na cozinha e aumentos de recursos, que podem acelerar significativamente sua jornada. Ao maximizar seu SFL (Sunflower Token), você pode fabricar ferramentas, coletar recursos e expandir seu terreno para estabelecer ainda mais seu império agrícola.",
  "crafting.description.two":
    "Para começar a fabricar itens, vamos visitar Igor, um artesão talentoso de Sunfloria. Depois de pegar o barco e chegar a Sunfloria, vá até o topo da ilha para conversar com Igor. Ele atualmente oferece um Espantalho básico, que aumenta a velocidade de crescimento dos Girassóis, Batatas e Abóboras. É um ótimo negócio que requer a troca de seus recursos pelo espantalho. Uma vez obtido, volte para sua ilha principal e entre no modo de design clicando no ícone de mão branca no canto superior direito do jogo.",
  "crafting.description.three":
    "No modo de design, você pode posicionar estrategicamente itens e reorganizar recursos em sua fazenda para otimizar seu layout e melhorar seu apelo visual. Esta etapa é crucial para maximizar a eficiência do seu equipamento fabricado. Por exemplo, coloque o espantalho nas parcelas que você deseja impulsionar. Além disso, considere comprar decorações para adicionar charme e ordem ao seu terreno.",
  "crafting.description.four":
    "Ao fabricar equipamentos e posicioná-los estrategicamente, você pode amplificar suas habilidades agrícolas, criar uma ilha da qual pode se orgulhar e acelerar sua progressão em Sunflower Land.",

  "deliveries.description.one":
    "As entregas em Sunflower Land oferecem uma oportunidade emocionante de ajudar os Goblins famintos e outros Bumpkins enquanto ganha recompensas. Todos os dias, você pode ver todos os pedidos clicando no quadro de entregas no canto inferior esquerdo da tela. Os pedidos foram feitos por alguns NPCs locais que podem ser encontrados ao redor da Pumpkin Plaza. Para completar um pedido, você precisará pegar um barco para a Pumpkin Plaza e procurar o NPC que está esperando pela entrega. Uma vez que você os encontre, clique neles para entregar o pedido e receber sua recompensa.",
  "deliveries.description.two":
    "Como um novo jogador, você começa com três espaços de pedido, mas à medida que expande sua fazenda, você desbloqueará espaços adicionais, permitindo que jogadores avançados aceitem mais pedidos. Novos pedidos chegam a cada 24 horas, oferecendo uma variedade de tarefas, desde produção agrícola até culinária e coleta de recursos. Ao completar os pedidos, você ganhará bônus de nível, incluindo Block Bucks, SFL, cakex deliciosos e outras recompensas. O sistema de recompensa é baseado na dificuldade do pedido, então considere priorizar pedidos que oferecem recompensas maiores para maximizar seus ganhos. Fique de olho no quadro e enfrente o desafio com vários pedidos, subindo de nível e desbloqueando novos edifícios conforme necessário para atender a pedidos mais exigentes.",

  "scavenger.description.one":
    "A exploração em Sunflower Land oferece oportunidades emocionantes para descobrir tesouros escondidos e coletar recursos valiosos. O primeiro aspecto da exploração envolve cavar tesouros na Ilha do Tesouro, onde você pode se tornar um caçador de tesouros pirata. Ao fabricar uma pá de areia e se aventurar na Ilha do Tesouro, você pode cavar em áreas de areia escura para descobrir vários tesouros, incluindo saques, decorações e até SFTs antigos com utilidade.",
  "scavenger.description.two":
    "Outra forma de exploração é coletar cogumelos selvagens que aparecem espontaneamente na sua fazenda e nas ilhas ao redor. Estes cogumelos podem ser coletados gratuitamente e usados em receitas, missões e na fabricação de itens. Fique atento a esses cogumelos, pois eles se renovam a cada 16 horas, com um limite máximo de 5 cogumelos na sua fazenda. Se o seu terreno estiver cheio, os cogumelos aparecerão nas ilhas ao redor, garantindo que você não perca esses recursos preciosos.",

  "fruit.description.one":
    "As frutas desempenham um papel importante em Sunflower Land como um recurso valioso que pode ser vendido por SFL ou usado em várias receitas e fabricações. Ao contrário das culturas, as parcelas de frutas têm a capacidade única de se regenerar várias vezes após cada colheita, oferecendo uma fonte sustentável de frutas para os jogadores.",
  "fruit.description.two":
    "Para plantar frutas, você precisará adquirir parcelas de frutas maiores, que se tornam disponíveis na 9ª-10ª expansão da sua fazenda.",
  "fruit.description.three":
    "Ao cultivar frutas e integrá-las às suas estratégias agrícolas, você pode maximizar seus lucros, criar receitas deliciosas e desbloquear novas possibilidades em Sunflower Land.",

  "seasons.description.one":
    "As estações em Sunflower Land trazem excitação e novidade ao jogo, oferecendo aos jogadores novos desafios e oportunidades. Com a introdução de cada estação, os jogadores podem esperar uma variedade de novos itens artesanais, decorações de edição limitada, animais mutantes e tesouros raros. Essas mudanças sazonais criam uma experiência de jogo dinâmica e evolutiva, incentivando os jogadores a adaptar suas estratégias e explorar novas possibilidades em suas fazendas. Além disso, os ingressos sazonais adicionam um elemento estratégico ao jogo, pois os jogadores devem decidir como alocar sabiamente seus ingressos, seja para coletar itens raros, optar por decorações em grande quantidade ou trocar ingressos por SFL. O mecanismo sazonal mantém o jogo cativante e garante que sempre haja algo a antecipar em Sunflower Land.",
  "seasons.description.two":
    "A disponibilidade de itens sazonais no Goblin Blacksmith adiciona uma camada extra de excitação. Os jogadores devem reunir os recursos necessários e os ingressos sazonais para fabricar esses itens em quantidade limitada, criando um sentimento de competição e urgência. O planejamento antecipado e a estratégia se tornam cruciais à medida que os jogadores buscam garantir os itens desejados antes que a oferta se esgote. Além disso, a opção de trocar ingressos sazonais por SFL oferece flexibilidade e permite que os jogadores façam escolhas alinhadas com seus objetivos de jogo específicos. Com as ofertas únicas de cada estação e a antecipação de eventos surpresa, Sunflower Land mantém os jogadores engajados e entretidos durante todo o ano, promovendo uma experiência agrícola vibrante e sempre em evolução.",
  "pete.teaser.one": "Corte as árvores",
  "pete.teaser.two": "Expanda seu terreno",
  "pete.teaser.three": "Colha os girassóis",
  "pete.teaser.four": "Venda os girassóis",
  "pete.teaser.five": "Compre sementes",
  "pete.teaser.six": "Plante as sementes",
  "pete.teaser.seven": "Fabrique um espantalho",
  "pete.teaser.eight": "Cozinhe comida e suba de nível",
};

const grubshop: Record<GrubShop, string> = {
  "message.grublinOrders": "Volte amanhã para ver os Pedidos dos Grublins.",
  "message.orderFulfilled": "Pedido cumprido",
  "message.grubShopClosed": "A Loja Grub está fechada às terças-feiras.",
  "message.moreOrdersIn": "Mais pedidos em",
  "message.bonusOffer": "Oferta de Bônus",
  "message.earnSeasonalTickets":
    "Ganhe 10 Bilhetes Sazonais para cada refeição.",
};

const halveningCountdown: Record<HalveningCountdown, string> = {
  "halveningCountdown.approaching": "O Halvening está se aproximando!",
  "halveningCountdown.description":
    "Durante o Halvening, todos os preços das culturas e alguns recursos são divididos pela metade. Isso torna mais difícil obter SFL.",
  "halveningCountdown.preparation": "Certifique-se de estar preparado!",
  "halveningCountdown.title": "Halvening",
  "halveningCountdown.readMore": "Saiba mais",
};

const harvestflower: Record<Harvestflower, string> = {
  "harvestflower.noBumpkin": "Você não tem um Bumpkin",
  "harvestflower.noFlowerBed": "Canteiro de flores não existe",
  "harvestflower.noFlower": "Canteiro de flores não tem uma flor",
  "harvestflower.notReady": "A flor não está pronta para ser colhida",
  "harvestflower.alr.plant": "Já existe uma flor plantada aqui.",
};

const harvestBeeHive: Record<HarvestBeeHive, string> = {
  "harvestBeeHive.notPlaced": "Esta colmeia não está colocada.",
  "harvestBeeHive.noHoney": "Esta colmeia não tem mel.",
};

const hayseedHankPlaza: Record<HayseedHankPlaza, string> = {
  "hayseedHankPlaza.cannotCompleteChore": "Não consegue completar esta tarefa?",
  "hayseedHankPlaza.skipChore": "Pular tarefa",
  "hayseedHankPlaza.canSkipIn": "Você pode pular esta tarefa em",
  "hayseedHankPlaza.wellDone": "Bem feito",
  "hayseedHankPlaza.lendAHand": "Dar uma mão?",
};

const hayseedHankV2: Record<HayseedHankV2, string> = {
  "hayseedHankv2.dialog1":
    "Bem, olá aí, jovens travessos! Eu sou Hayseed Hank, um velho fazendeiro Bumpkin experiente, cuidando da terra como nos bons velhos tempos.",
  "hayseedHankv2.dialog2":
    "No entanto, meus ossos já não são mais os mesmos. Se você puder me ajudar com minhas tarefas diárias, eu te recompensarei com ",
  "hayseedHankv2.action": "Vamos fazer isso",
  "hayseedHankv2.title": "Tarefas Diárias",
  "hayseedHankv2.newChoresAvailable": "Novas tarefas disponíveis em ",
  "hayseedHankv2.skipChores": "Você pode pular as tarefas a cada novo dia.",
  "hayseedHankv2.greeting":
    "Bem, olá aí, jovens pestinhas! Eu sou Hayseed Hank...",
};

const heliosSunflower: Record<HeliosSunflower, string> = {
  "heliosSunflower.title": "Clytie o Girassol",
  "heliosSunflower.description":
    "Apenas o verdadeiro salvador pode voltar e colher este Girassol.",
  "confirmation.craft": "Tem certeza de que deseja criar",
};

const henHouseTerms: Record<HenHouseTerms, string> = {
  "henHouse.chickens": "Galinhas",
  "henHouse.text.one": "Alimente-as com trigo e colete ovos",
  "henHouse.text.two": "Galinha Preguiçosa",
  "henHouse.text.three":
    "Coloque sua galinha para trabalhar para começar a coletar ovos!",
  "henHouse.text.four": "Galinha Trabalhadora",
  "henHouse.text.five": "Já colocada e trabalhando duro!",
  "henHouse.text.six": "Construa outra Hen House para criar mais galinhas",
};

const howToFarm: Record<HowToFarm, string> = {
  "howToFarm.title": "Como cultivar?",
  "howToFarm.stepOne": "1. Colha as culturas quando estiverem prontas",
  "howToFarm.stepTwo": "2. Visite a cidade e clique na loja",
  "howToFarm.stepThree": "3. Venda as culturas na loja em troca de SFL",
  "howToFarm.stepFour": "4. Compre sementes com seus SFL",
  "howToFarm.stepFive": "5. Plante as sementes e espere",
};

const howToSync: Record<HowToSync, string> = {
  "howToSync.title": "Como sincronizar?",
  "howToSync.description":
    "Todo o seu progresso é salvo em nosso servidor de jogo. Você precisará sincronizar na cadeia quando quiser mover seus tokens, NFTs e recursos para o Polygon.",
  "howToSync.stepOne": "1. Abra o menu",
  "howToSync.stepTwo": "2. Clique em 'Sincronizar na cadeia'",
};

const howToUpgrade: Record<HowToUpgrade, string> = {
  "howToUpgrade.title": "Como melhorar?",
  "howToUpgrade.stepOne": "1. Fale com um goblin bloqueando os campos",
  "howToUpgrade.stepTwo": "2. Visite a cidade e clique na cozinha",
  "howToUpgrade.stepThree": "3. Prepare o prato que o goblin deseja",
  "howToUpgrade.stepFour": "4. Pronto! Aproveite seus novos campos e culturas",
};

const islandupgrade: Record<Islandupgrade, string> = {
  "islandupgrade.confirmUpgrade":
    "Tem certeza de que deseja atualizar para uma nova ilha.",
  "islandupgrade.warning":
    "Certifique-se de não ter culturas, frutas, construções ou galinhas em andamento. Estes serão devolvidos ao seu inventário.",
  "islandupgrade.upgradeIsland": "Atualizar Ilha",
  "islandupgrade.newOpportunities":
    "Uma ilha exótica espera por você com novos recursos e oportunidades para expandir sua fazenda.",
  "islandupgrade.confirmation":
    "Gostaria de atualizar? Seus recursos serão transferidos com segurança para a sua nova ilha.",
  "islandupgrade.locked": "Bloqueado",
  "islandupgrade.continue": "Continuar",
  "islandupgrade.exploring": "Explorando",
  "islandupgrade.welcomePetalParadise": "Bem-vindo ao Paraíso das Pétalas!",
  "islandupgrade.itemsReturned":
    "Seus itens foram devolvidos com segurança ao seu inventário.",
  "islandupgrade.notReadyExpandMore": "Você não está pronto. Desenvolver mais",
  "islandupgrade.notReadyExpandMore.two": "expansões",
  "islandupgrade.exoticResourcesDescription":
    "Esta área do Sunflower Land é conhecida por seus recursos exóticos. Expanda suas terras para descobrir frutas, flores, colmeias de abelhas e minerais raros!",
};

const interactableModals: Record<InteractableModals, string> = {
  "interactableModals.returnhome.message": "Deseja voltar para casa?",
  "interactableModals.fatChicken.message":
    "Por que esses Bumpkins não me deixam em paz, só quero relaxar.",
  "interactableModals.lazyBud.message": "Eeeep! Tão cansado.....",
  "interactableModals.bud.message":
    "Hmm, é melhor deixar esse broto em paz. Tenho certeza que seu dono está procurando por ele",
  "interactableModals.walrus.message":
    "Arrr arr arrr! A peixaria não abrirá até que eu tenha meu peixe.",
  "interactableModals.plazaBlueBook.message1":
    "Para invocar os pesquisadores, precisamos reunir a essência da terra - abóboras, alimentadas pela terra, e ovos, promessa de novos começos.",
  "interactableModals.plazaBlueBook.message2":
    "Ao cair da noite e sob o brilho prateado da lua, oferecemos nossos humildes presentes, esperando despertar novamente seus olhos vigilantes.",
  "interactableModals.plazaOrangeBook.message1":
    "Nossos valentes defensores lutaram bravamente, mas, infelizmente, perdemos a grande guerra, e os Moonseekers nos expulsaram de nossa terra natal. No entanto, mantemos a esperança, pois um dia retomaremos o que era nosso.",
  "interactableModals.plazaOrangeBook.message2":
    "Até esse dia, manteremos Sunflower Land viva em nossos corações e sonhos, aguardando o dia do nosso retorno triunfante",
  "interactableModals.beachGreenBook.message1":
    "Quando estiver procurando por esses cobiçados Red Snappers, tente uma abordagem inesperada",
  "interactableModals.beachGreenBook.message2":
    "Use Maçãs com isca Red Wiggler, e veja essas belezas escarlates saltarem praticamente para sua rede.",
  "interactableModals.beachBlueBook.message1":
    "Não conte para Shelly, mas estou tentando atrair Saw Sharks para a praia!",
  "interactableModals.beachBlueBook.message2":
    "Tenho experimentado diferentes iscas recentemente, mas a única que parece funcionar é o Red Snapper.",
  "interactableModals.beachBlueBook.message3":
    "Esses caçadores oceânicos podem sentir um banquete de Red Snapper a quilômetros de distância, então não se surpreenda se eles chegarem atacando.",
  "interactableModals.beachOrangeBook.message1":
    "Uma barbatana radiante apareceu na superfície, mal podia acreditar nos meus olhos!",
  "interactableModals.beachOrangeBook.message2":
    "Felizmente, Tango estava comigo, ele deve ser meu amuleto da sorte.",
  "interactableModals.plazaGreenBook.message1":
    "Os Bumpkins controlam estas ilhas, deixando nós, os goblins, com pouco trabalho e ainda menos comida.",
  "interactableModals.plazaGreenBook.message2":
    "Aspiramos à igualdade, um lugar para nós, onde possamos viver e prosperar",
  "interactableModals.fanArt1.message":
    "Parabéns a Palisman, o vencedor do primeiro concurso de Fan Art",
  "interactableModals.fanArt2.message":
    "Parabéns a Vergelsxtn, o vencedor do concurso de Fan Art da Dawn Breaker Party",
  "interactableModals.fanArt2.linkLabel": "Ver mais",
  "interactableModals.fanArt3.message":
    "O lugar perfeito para uma bela pintura. Fico imaginando o que colocarão aqui a seguir...",
  "interactableModals.clubhouseReward.message1":
    "Paciência, meu amigo, as recompensas estão a caminho...",
  "interactableModals.clubhouseReward.message2":
    "Junte-se ao #bud-clubhouse no Discord para as últimas atualizações.",
  "interactableModals.plazaStatue.message":
    "Em homenagem a Bumpkin Braveheart, o agricultor inabalável que reuniu nossa cidade contra a horda de goblins durante os dias sombrios da guerra antiga.",
  "interactableModals.dawnBook1.message1":
    "Por séculos, nossa família protege Dawn Breaker Island. Como sineiro da ilha, alertamos sobre perigos vindos do Norte, mesmo quando criaturas sombrias ameaçavam nosso lar.",
  "interactableModals.dawnBook1.message2":
    "Nossa família se mantém como a primeira linha de defesa contra a escuridão que se espalha do Norte, mas, infelizmente, nossos sacrifícios passam despercebidos.",
  "interactableModals.dawnBook1.message3":
    "Será que chegará o dia em que nosso compromisso será reconhecido?",
  "interactableModals.dawnBook2.message1":
    "As berinjelas, elas são mais do que aparentam. Apesar de seu exterior escuro que atrai criaturas sombrias, elas trazem luz para nossos pratos.",
  "interactableModals.dawnBook2.message2":
    "Grelhadas ou esmagadas em ganoush de Bumpkin, sua versatilidade é incomparável. Os vegetais da família das solanáceas são um símbolo de nossa resiliência diante da adversidade.",
  "interactableModals.dawnBook3.message1":
    "Querido diário, a chegada dos Bumpkins trouxe um raio de esperança.",
  "interactableModals.dawnBook3.message2":
    "Sonho com o dia em que poderei pilotar meu próprio barco para Sunfloria, a terra onde aventureiros e viajantes se reúnem.",
  "interactableModals.dawnBook3.message3":
    "Ouvi rumores sobre as preparações especiais dos Bumpkins lá - um farol de promessa nestes tempos difíceis.",
  "interactableModals.dawnBook4.message1":
    "Os gnomos, seu encanto era forte demais para resistir.",
  "interactableModals.dawnBook4.message2":
    "As instruções da Bruxa ecoavam em minha mente - 'Alinhe os três, e o poder será seu.'",
  "interactableModals.dawnBook4.message3":
    "Infelizmente, até os soldados berinjela não conseguiram manter a tentação à distância. Mas eu não desistirei. Um dia, reivindicarei o poder que legitimamente mereço.",
  "interactableModals.timmyHome.message":
    "Oh, droga, eu realmente gostaria que você explorasse minha casa, mas Mamãe me disse para não falar com estranhos, talvez seja melhor assim.",
  "interactableModals.windmill.message":
    "Ah, meu moinho está em reparo, não posso deixar ninguém fuçar enquanto estou consertando, volte mais tarde.",
  "interactableModals.igorHome.message":
    "Cai fora! Não estou no clima para receber visitantes, especialmente curiosos como você!",
  "interactableModals.potionHouse.message1":
    "Cuidado, amigo, o cientista louco mora aí dentro!",
  "interactableModals.potionHouse.message2":
    "Dizem que eles estão procurando aprendizes Bumpkin para cultivar culturas mutantes com eles.",
  "interactableModals.guildHouse.message":
    "Espere, Bumpkin! Você precisa de um Bud para entrar na Casa da Guilda.",
  "interactableModals.guildHouse.readMore": "Saiba mais",
  "interactableModals.guildHouse.budsCollection": "Coleção de Buds no Opensea",
  "interactableModals.bettyHome.message":
    "Oh, querido, por mais que eu ame minhas culturas, minha casa é um espaço privado, atualmente fechado para visitantes.",
  "interactableModals.bertHome.message":
    "Intrusos! Eles devem estar atrás da minha coleção de itens raros e segredos, não posso deixá-los entrar!",
  "interactableModals.beach.message1": "Você já foi à praia?",
  "interactableModals.beach.message2":
    "Dizem que ela está cheia de tesouros luxuosos! Infelizmente, está em construção.",
  "interactableModals.castle.message":
    "Pare aí, camponês! De jeito nenhum que eu vou deixar você visitar o castelo",
  "interactableModals.woodlands.message":
    "Você está indo para a floresta? Certifique-se de pegar deliciosos cogumelos!",
  "interactableModals.port.message":
    "Espere um pouco! Os goblins ainda estão construindo o porto. Em breve estará pronto para viagens e pesca.",
  "interactableModals.like.home": "Deseja voltar para casa?",
};

const introTerms: Record<Intro, string> = {
  "intro.one":
    "Olá, Bumpkin! Bem-vindo à Sunflower Land, o paraíso agrícola abundante onde tudo é possível!",
  "intro.two":
    "Que bela ilha você montou! Eu sou Pumpkin' Pete, seu vizinho agricultor.",
  "intro.three":
    "No momento, os jogadores estão celebrando um festival na praça com recompensas fantásticas e itens mágicos.",
  "intro.four":
    "Antes de poder se juntar à festa, você precisará desenvolver sua fazenda e coletar recursos. Você não quer chegar de mãos vazias!",
  "intro.five":
    "Para começar, você pode cortar essas árvores e expandir sua ilha.",
};

const introPage: Record<IntroPage, string> = {
  "introPage.welcome": "Bem-vindo à Sala de Poções, meu aprendiz curioso!",
  "introPage.description":
    "Eu sou o Cientista Maluco Bumpkin, aqui para te ajudar nesta jornada mágica no mundo da feitiçaria botânica. Prepare-se para descobrir os segredos de Sunflower Land! Cada tentativa custará 1 SFL.",
  "introPage.mission":
    "Sua missão: decifrar a combinação certa de poções na grade encantada.",
  "introPage.tip":
    "Lembre-se, quanto mais poções corretas você selecionar, mais a planta ficará feliz, aumentando suas chances de encontrar itens raros!",
  "introPage.feedbackIcons": "Fique de olho nos ícones de feedback:",
  "introPage.correctPosition": "Uma poção perfeita na posição perfeita",
  "introPage.correctPotionWrongPosition":
    "Poção correta, mas na posição errada",
  "introPage.wrongPotion": "Ops, poção errada",
  "introPage.chaosPotion": "Cuidado com a poção 'caos', ela bagunça tudo!",
  "introPage.playButton": "Vamos jogar",
};

const islandName: Record<IslandName, string> = {
  "island.home": "Casa",
  "island.pumpkin.plaza": "Praça da Abóbora",
  "island.beach": "Praia",
  "island.woodlands": "Floresta",
  "island.helios": "Helios",
  "island.goblin.retreat": "Refúgio dos Goblins",
};

const islandNotFound: Record<IslandNotFound, string> = {
  "islandNotFound.message": "Você pousou no meio do nada!",
  "islandNotFound.takeMeHome": "Me leve para casa",
};

const kick: Record<Kick, string> = {
  "kick.player": "Expulsar um jogador",
  "kick.player.id": "ID da fazenda do jogador",
  "kick.Message":
    "Por favor, note que você ainda pode se juntar novamente, mas se continuar a violar as regras, tomaremos medidas adicionais.",
  "kick.Reason": "Motivo da expulsão (observe que o jogador verá isso)",
  "kick.player.farm": "Expulsar o jogador da fazenda",
  "kick.player.kick": "O jogador foi expulso.",
  "kick.player.failed": "Falha ao expulsar o jogador",
  "kick.player.kicking": "Expulsando o jogador...",
  "kick.please": "Por favor, aguarde",
};

const kicked: Record<Kicked, string> = {
  "kicked.kicked": "Você foi expulso!",
  "kicked.Reason": "Motivo:",
  "kicked.Message":
    "Por favor, note que você ainda pode se juntar, mas se continuar a violar as regras, tomaremos medidas adicionais.",
  "kicked.accept": "Aceitar",
};

const landscapeTerms: Record<LandscapeTerms, string> = {
  "landscape.intro.one": "Projete sua ilha dos sonhos!",
  "landscape.intro.two":
    "No modo de design, você pode segurar, arrastar e mover objetos.",
  "landscape.intro.three": "Crie decorações raras",
  "landscape.intro.four": "Coloque objetos de coleção de seu baú",
  "landscape.expansion.one":
    "Cada lote de terra vem com recursos exclusivos para ajudar a construir seu império agrícola!",
  "landscape.expansion.two": "Mais expansões em breve...",
  "landscape.timerPopover": "Próxima expansão",
  "landscape.dragMe": "Arraste-me",
};

const levelUpMessages: Record<LevelUpMessages, string> = {
  "levelUp.2":
    "Yeehaw, você atingiu o nível 2! As culturas estão tremendo em suas botas.",
  "levelUp.3":
    "Parabéns pelo nível 3! Você está crescendo como uma erva daninha...",
  "levelUp.4":
    "Parabéns pelo nível 4! Você oficialmente superou o seu polegar verde.",
  "levelUp.5":
    "Nível 5 e ainda vivo! Seu trabalho árduo está dando frutos... ou deveríamos dizer 'trabalho no feno'?",
  "levelUp.6":
    "Uau, nível 6 já? Você deve ser forte como um boi. Ou pelo menos o seu arado é.",
  "levelUp.7": "Parabéns por atingir o nível 7! Sua fazenda está incrível.",
  "levelUp.8":
    "Nível 8, muito bem! Você está plantando as sementes do sucesso.",
  "levelUp.9":
    "Nove, nove, nível 9! Sua colheita está crescendo tão rápido quanto suas habilidades.",
  "levelUp.10":
    "Nível 10, números duplos! Sua fazenda está tão bonita que até as galinhas ficam impressionadas.",
  "levelUp.11": "Nível 11, você está fazendo chover (água, é claro)!",
  "levelUp.12":
    "Parabéns pelo nível 12! Sua fazenda está realmente desenvolvendo caráter.",
  "levelUp.13":
    "Sorte no nível 13! Você está realmente pegando o jeito dessa agricultura.",
  "levelUp.14": "Nível 14, é incrível ver o progresso que você fez!",
  "levelUp.15": "15 e próspero! Sua fazenda nunca esteve tão bonita.",
  "levelUp.16":
    "Parabéns pelo nível 16! Suas habilidades em agricultura estão realmente enraizando.",
  "levelUp.17": "Nível 17, você colhe o que semeia (e parece bom!).",
  "levelUp.18": "18 e cheio de potencial!",
  "levelUp.19":
    "Parabéns pelo nível 19! Sua fazenda está crescendo tão rápido quanto suas habilidades.",
  "levelUp.20": "Nível 20, você é a nata da colheita!",
  "levelUp.21": "21 e colhendo como um profissional!",
  "levelUp.22": "Parabéns pelo nível 22! Sua fazenda está prosperando.",
  "levelUp.23":
    "Nível 23, suas habilidades em agricultura estão realmente florescendo!",
  "levelUp.24": "Você está realmente florescendo no nível 24!",
  "levelUp.25":
    "Nível do quarto de século! Você está fazendo feno enquanto o sol brilha.",
  "levelUp.26":
    "Parabéns pelo nível 26! Você está realmente aproveitando essa agricultura.",
  "levelUp.27": "Nível 27, você está se destacando no campo!",
  "levelUp.28": "Você está elevando o nível no nível 28!",
  "levelUp.29":
    "Parabéns pelo nível 29! Você está realmente cultivando habilidades sérias.",
  "levelUp.30": "Nível 30, você agora é um verdadeiro fazendeiro!",
  "levelUp.31": "31 e ainda crescendo!",
  "levelUp.32": "Parabéns pelo nível 32! Sua fazenda está florescendo.",
  "levelUp.33":
    "Nível 33, suas habilidades em agricultura estão realmente enraizando!",
  "levelUp.34": "Você está realmente germinando no nível 34!",
  "levelUp.35": "Nível 35, você é o trator-reboque da agricultura!",
  "levelUp.36":
    "Parabéns pelo nível 36! Sua fazenda está realmente colhendo sucesso.",
  "levelUp.37": "Nível 37, suas habilidades estão realmente se desenvolvendo!",
  "levelUp.38":
    "Você está realmente semeando as sementes do sucesso no nível 38!",
  "levelUp.39":
    "Parabéns pelo nível 39! Sua fazenda está realmente amadurecendo.",
  "levelUp.40": "Nível 40, você é um verdadeiro herói da colheita!",
  "levelUp.41": "41 e ainda crescendo!",
  "levelUp.42":
    "Parabéns pelo nível 42! Sua fazenda está realmente colhendo recompensas.",
  "levelUp.43":
    "Nível 43, suas habilidades em agricultura estão realmente enraizando!",
  "levelUp.44": "Você está realmente colhendo felicidade no nível 44!",
  "levelUp.45": "Nível 45, você é um verdadeiro mestre da colheita!",
  "levelUp.46":
    "Parabéns pelo nível 46! Suas habilidades em agricultura estão realmente dando frutos.",
  "levelUp.47":
    "Nível 47, você está realmente se tornando uma lenda na agricultura.",
  "levelUp.48": "Você está realmente prosperando no nível 48!",
  "levelUp.49":
    "Parabéns pelo nível 49! Você está realmente colhendo os frutos de seu trabalho árduo.",
  "levelUp.50":
    "Metade do caminho para 100! Você agora é um verdadeiro profissional na agricultura.",
  "levelUp.51": "51 e ainda crescendo!",
  "levelUp.52":
    "Parabéns pelo nível 52! Sua fazenda é uma verdadeira obra de arte.",
  "levelUp.53": "Nível 53, suas habilidades estão realmente enraizando.",
  "levelUp.54": "Você está realmente colhendo a felicidade no nível 54!",
  "levelUp.55": "Nível 55, você é uma verdadeira força na agricultura.",
  "levelUp.56":
    "Parabéns pelo nível 56! Sua fazenda está realmente florescendo.",
  "levelUp.57": "Nível 57, você está realmente cultivando habilidades sérias.",
  "levelUp.58":
    "Você está realmente semeando as sementes do sucesso no nível 58!",
  "levelUp.59": "Parabéns pelo nível 59! Sua fazenda é a melhor das melhores.",
  "levelUp.60": "Nível 60, você agora é uma verdadeira estrela na agricultura!",
};

const letsGo: Record<LetsGo, string> = {
  "letsGo.title": "É hora de jogar!",
  "letsGo.description":
    "Obrigado por jogar a versão beta! Ainda estamos trabalhando no jogo e apreciamos seu apoio durante estas primeiras etapas!",
  "letsGo.readMore": "Você pode saber mais sobre o jogo na ",
  "letsGo.officialDocs": "documentação oficial",
  "letsGo.officialDocsLink": "https://docs.sunflower-land.com",
};

const loser: Record<Loser, string> = {
  "loser.unsuccess": "Você não teve sucesso",
  "loser.refund": "Reembolso de recursos",
  "loser.longer": "O leilão não existe mais",
  "loser.refund.one": "Reembolsar",
};

const lostSunflorian: Record<LostSunflorian, string> = {
  "lostSunflorian.line1": "Meu pai me enviou aqui para governar Helios.",
  "lostSunflorian.line2":
    "Infelizmente, esses Bumpkins não gostam que eu os supervise.",
  "lostSunflorian.line3": "Estou ansioso para voltar para Sunfloria.",
};

const modalDescription: Record<ModalDescription, string> = {
  "modalDescription.friend": "Olá amigo!",
  "modalDescription.love.fruit":
    "Uau, você realmente ama frutas tanto quanto eu!",
  "modalDescription.gift":
    "Eu não tenho mais presentes para você. Não se esqueça de usar seus novos itens!",
  "modalDescription.limited.abilitie":
    "Eu criei roupas de edição limitada que podem melhorar suas habilidades de colheita de frutas.",
  "modalDescription.trail":
    "Estou procurando colhedores de frutas dedicados para testar essas roupas... DE GRAÇA!",
};

const mute: Record<Mute, string> = {
  "mute.playe": "Silenciar um jogador",
  "mute.playe.id": "ID da fazenda do jogador",
  "mute.duration": "Duração do silenciamento (Observe que o jogador verá isso)",
  "mute.Reason": "Motivo do silenciamento (Observe que o jogador verá isso)",
  "mute.player.farm": "Silenciar o jogador da fazenda",
  "mute.player.mute": "O jogador foi silenciado",
  "mute.fail": "Falha ao silenciar o jogador",
  "mute.player.muting": "Silenciando o jogador...",
  "mute.player.wait": "Aguarde por favor",
  "mute.you": "Você foi silenciado!",
  "mute.until": "Você está silenciado até",
  "mute.discord":
    "Se você discorda dessa decisão, entre em contato conosco no Discord.",
  "mute.accept": "Aceitar",
  "mute.unmute.farm": "Remover o silenciamento do jogador da fazenda",
  "mute.unmute.player": "O jogador foi desmutado",
  "mute.unmute.failed": "Falha ao remover o silenciamento do jogador",
  "mute.unmuting.player": "Desmutando o jogador...",
  "mute.unmute.wait": "Aguarde por favor",
  "mute.online":
    "No caso de você precisar silenciar um jogador que não está online, você pode fazê-lo aqui. Quando eles se conectarem na próxima vez, eles serão silenciados.",
};

const noBumpkin: Record<NoBumpkin, string> = {
  "noBumpkin.readyToFarm":
    "Ótimo, seu Bumpkin está pronto para trabalhar na fazenda!",
  "noBumpkin.play": "Jogar",
  "noBumpkin.missingBumpkin": "Você está sem seu Bumpkin",
  "noBumpkin.bumpkinNFT":
    "Um Bumpkin é um NFT que está registrado na Blockchain.",
  "noBumpkin.bumpkinHelp":
    "Você precisa de um Bumpkin para ajudar a plantar, colher, cortar, minerar e expandir sua terra.",
  "noBumpkin.mintBumpkin": "Você pode obter um Bumpkin no OpenSea.",
  "noBumpkin.allBumpkins": "Uau, veja todos esses Bumpkins!",
  "noBumpkin.chooseBumpkin": "Com qual Bumpkin você gostaria de jogar?",
  "noBumpkin.deposit": "Depositar",
  "noBumpkin.loading": "Carregando",
};

const noTownCenter: Record<NoTownCenter, string> = {
  "noTownCenter.reward": "Recompensa: 1 x Centro da Cidade!",
  "noTownCenter.news": "Suas últimas notícias ou anúncios aqui.",
  "noTownCenter.townCenterPlacement":
    "Você pode colocar o Centro da Cidade na seção Inventário > Edifícios.",
};

const notOnDiscordServer: Record<NotOnDiscordServer, string> = {
  "notOnDiscordServer.warning": "Aviso",
  "notOnDiscordServer.intro":
    "Parece que você ainda não se juntou ao servidor Discord da Terra do Girassol.",
  "notOnDiscordServer.joinDiscord": "Junte-se ao nosso ",
  "notOnDiscordServer.discordServer": "Servidor Discord",
  "notOnDiscordServer.completeVerification":
    "2. Complete a verificação e comece",
  "notOnDiscordServer.acceptRules": "3. Aceite as regras em #regras",
  "notOnDiscordServer.tryAgain": "4. Tente novamente",
  "notOnDiscordServer.close": "Fechar",
  "notOnDiscordServer.tryAgainButton": "Tentar Novamente",
};

const npc_message: Record<NPC_MESSAGE, string> = {
  // Betty
  "npcMessages.betty.msg1":
    "Oh lá lá, estou ansiosa para colocar as mãos em produtos frescos!",
  "npcMessages.betty.msg2":
    "Estou tão animada para experimentar novas culturas, o que você tem para mim?",
  "npcMessages.betty.msg3":
    "Esperei o dia todo por uma chance de colher frutas deliciosas!",
  "npcMessages.betty.msg4":
    "Estou ansiosa para ver que tipo de culturas estão prontas para serem colhidas hoje.",
  "npcMessages.betty.msg5":
    "Estou ansiosa para experimentar os frutos do meu trabalho, que tipo de produtos você tem?",
  "npcMessages.betty.msg6":
    "Tenho uma verdadeira paixão pela agricultura e estou sempre em busca de novas culturas interessantes para cultivar.",
  "npcMessages.betty.msg7":
    "Não há nada como a sensação de colher uma grande quantidade de culturas, isso é o verdadeiro trabalho agrícola!",
  // Blacksmith
  "npcMessages.blacksmith.msg1":
    "Preciso de alguns suprimentos para minha última invenção, você tem materiais?",
  "npcMessages.blacksmith.msg2":
    "Estou procurando armazenar recursos brutos, você tem algum para vender?",
  "npcMessages.blacksmith.msg3":
    "Preciso de materiais para artesanato, você tem algo que eu possa usar?",
  "npcMessages.blacksmith.msg4":
    "Você tem recursos raros ou únicos que eu poderia usar?",
  "npcMessages.blacksmith.msg5":
    "Estou interessado em adquirir materiais de alta qualidade, o que você tem a oferecer?",
  "npcMessages.blacksmith.msg6":
    "Estou procurando materiais para meu próximo projeto, você tem algo para oferecer?",
  "npcMessages.blacksmith.msg7":
    "Estou no mercado por materiais brutos, você tem algum para vender?",
  // Pumpkin' Pete
  "npcMessages.pumpkinpete.msg1":
    "Oi você, novato! Que tal alguns produtos frescos?",
  "npcMessages.pumpkinpete.msg2":
    "Culturas saborosas, alguém está interessado? Eu sou seu homem para uma colheita fácil!",
  "npcMessages.pumpkinpete.msg3":
    "Fresco e delicioso, essa é minha filosofia. O que você tem a oferecer?",
  "npcMessages.pumpkinpete.msg4":
    "Novo na cidade? Vamos iluminar seu dia com algumas culturas!",
  "npcMessages.pumpkinpete.msg5":
    "Precisa de uma mãozinha, amigo? Tenho uma grande variedade de culturas para você!",
  "npcMessages.pumpkinpete.msg6":
    "Pete o enérgico, ao seu serviço! Culturas, alguém quer?",
  "npcMessages.pumpkinpete.msg7":
    "Bem-vindo à praça! Vamos tornar seu dia mais brilhante com culturas!",
  // Cornwell
  "npcMessages.cornwell.msg1":
    "Ah, os bons tempos... O trabalho árduo é minha filosofia. O que você tem a oferecer?",
  "npcMessages.cornwell.msg2":
    "Esses jovens, sem senso de trabalho! Traga-me algo desafiador.",
  "npcMessages.cornwell.msg3":
    "Lembro-me quando... O trabalho árduo é o que falta! ",
  "npcMessages.cornwell.msg4":
    "Um conhecimento árduo merece a melhor colheita. Me impressione!",
  "npcMessages.cornwell.msg5":
    "A história e o trabalho árduo são nosso lema. Qual é a sua escolha?",
  "npcMessages.cornwell.msg6":
    "Cornwell, esse é meu nome, e estou aqui para uma verdadeira experiência agrícola.",
  "npcMessages.cornwell.msg7":
    "Tarefas difíceis, recompensas generosas. Mostre-me o que você tem!",
  // Raven
  "npcMessages.raven.msg1":
    "A escuridão e o mistério são o meu domínio. Vou pegar as culturas mais desafiadoras.",
  "npcMessages.raven.msg2":
    "Gótico de alma, preciso das culturas mais sombrias para minhas poções.",
  "npcMessages.raven.msg3":
    "O sobrenatural e o sinistro, essa é a atmosfera que procuro. Me impressione.",
  "npcMessages.raven.msg4":
    "Desejo a colheita sombria para meus feitiços. Dê-me elas.",
  "npcMessages.raven.msg5":
    "Traga-me as culturas que se escondem nas sombras. Não vou ficar desapontado.",
  "npcMessages.raven.msg6":
    "Raven, o guardião das trevas, quer suas culturas mais exigentes.",
  "npcMessages.raven.msg7":
    "Delícias sombrias para um coração gótico. Mostre-me sua colheita mais sombria.",
  // Bert
  "npcMessages.bert.msg1":
    "Cara, esses cogumelos... eles são a chave. Você tem mágicos?",
  "npcMessages.bert.msg2":
    "A loucura dos cogumelos, sou eu. Cogumelos mágicos, alguém?",
  "npcMessages.bert.msg3":
    "Tudo se resume a cogumelos, cara. Passe-me os encantados.",
  "npcMessages.bert.msg4":
    "Eu vejo coisas, sabia? Cogumelos mágicos, é disso que preciso.",
  "npcMessages.bert.msg5":
    "A vida é uma jornada, cara, e eu preciso desses cogumelos mágicos para fazer isso!",
  "npcMessages.bert.msg6":
    "Bert, esse é o meu nome, cogumelos são o meu jogo. Os encantados, por favor!",
  "npcMessages.bert.msg7":
    "Cogumelos mágicos, meu amigo. Isso me mantém em movimento.",
  // Timmy
  "npcMessages.timmy.msg1":
    "Roaar! Sou o Timmy, o urso! Dê-me toda essa bondade frutada!",
  "npcMessages.timmy.msg2":
    "Sou um urso, e os ursos adoram frutas! Você tem guloseimas frutadas para mim?",
  "npcMessages.timmy.msg3":
    "Delícias frutadas, esse é o segredo. É coisa de Timmy, sabe?",
  "npcMessages.timmy.msg4":
    "Abraços de urso por frutas! É coisa de Timmy, você sabe?",
  "npcMessages.timmy.msg5":
    "Em um traje de urso, a vida é um festim. Frutas são minha geléia, você tem?",
  "npcMessages.timmy.msg6":
    "Timmy, o urso, está aqui para se divertir com frutas! Passe-me essas frutas!",
  "npcMessages.timmy.msg7":
    "Conversas frutíferas com um urso! Compartilhe o amor das frutas!",
  // Tywin
  "npcMessages.tywin.msg1":
    "Ouro, ouro e mais ouro! Mostre-me as riquezas, plebeus!",
  "npcMessages.tywin.msg2":
    "Estou de olho nos Bumpkins para garantir que paguem o que devem. Ouro, agora!",
  "npcMessages.tywin.msg3":
    "Plebeus, tragam-me suas riquezas! Eu sou Tywin, o príncipe exigente!",
  "npcMessages.tywin.msg4":
    "A Praça das Abóboras está abaixo de mim, mas ouro nunca é suficiente. Ainda mais!",
  "npcMessages.tywin.msg5":
    "Esta é a vida de um príncipe, e eu exijo sua riqueza. Pague seus impostos!",
  "npcMessages.tywin.msg6":
    "A riqueza de um príncipe não tem limites. Ouro, ouro e mais ouro!",
  "npcMessages.tywin.msg7":
    "O ouro é minha coroa, e eu quero tudo! Traga-me suas riquezas!",
  // Tango
  "npcMessages.tango.msg1":
    "Conversar, mordiscar e conversar mais! Frutas, frutas e mais frutas!",
  "npcMessages.tango.msg2":
    "Sou Tango, o macaco-esquilo frutado! Traga-me tesouros frutados!",
  "npcMessages.tango.msg3":
    "Laranja, travesso e brincalhão, sou eu. Frutas, alguém?",
  "npcMessages.tango.msg4":
    "Segredos das frutas? Eu os tenho! Compartilhe comigo as maravilhas frutadas!",
  "npcMessages.tango.msg5":
    "Travessuras frutíferas e delícias frutadas. Vamos nos divertir!",
  "npcMessages.tango.msg6":
    "Tango, esse é o meu nome, jogos frutados são minha fama. Me dê!",
  "npcMessages.tango.msg7":
    "O conhecimento das frutas corre em minha família. Conte-me suas histórias mais frutadas!",
  // Miranda
  "npcMessages.miranda.msg1":
    "Dance comigo, amigo! Você adicionará algo ao meu chapéu frutástico?",
  "npcMessages.miranda.msg2":
    "A samba e as frutas, eles combinam. O que você pode oferecer?",
  "npcMessages.miranda.msg3":
    "Ao ritmo da samba, as frutas são essenciais. Vai compartilhar?",
  "npcMessages.miranda.msg4":
    "Tudo se resume ao ritmo da samba e às guloseimas frutadas. Traga um pouco!",
  "npcMessages.miranda.msg5":
    "Junte-se à celebração da samba com um presente frutado para o meu chapéu!",
  "npcMessages.miranda.msg6":
    "O chapéu de Miranda adora o estilo frutado. O que você pode adicionar a ele?",
  "npcMessages.miranda.msg7": "Samba, frutas e amizade. Vamos fazer uma festa!",
  // Finn
  "npcMessages.finn.msg1":
    "Pesquei o maior prêmio de todos os tempos! Peixes, alguém?",
  "npcMessages.finn.msg2":
    "A vida é uma história de pescador, e eu tenho histórias para contar. Peixes pescados!",
  "npcMessages.finn.msg3":
    "Finn, o pescador, a lenda, e o sussurrador dos peixes. Alguns peixes pescados?",
  "npcMessages.finn.msg4":
    "Peixes grandes, grandes histórias e um grande ego. Traga seus tesouros de peixes!",
  "npcMessages.finn.msg5":
    "Anzol, linha e estilo, sou eu. Peixe é minha especialidade!",
  "npcMessages.finn.msg6":
    "Histórias de peixes, direitos de se gabar e um toque de modéstia. Peixe, por favor!",
  "npcMessages.finn.msg7":
    "Você sabia que os cirurgiões têm um fraque por um sabor crocante de milho?",
  "npcMessages.finn.msg8":
    "Pesquei o maior peixe de todos os tempos. Não é apenas uma história; é a realidade!",
  // Findley
  "npcMessages.findley.msg1":
    "Não vou deixar toda a glória para Finn! Preciso de iscas e camaradas para minha grande captura!",
  "npcMessages.findley.msg2":
    "Finn não é o único que sabe pescar. Preciso de iscas e camaradas, rápido!",
  "npcMessages.findley.msg3":
    "Vou mostrar a Finn quem é o verdadeiro pescador! Preciso de iscas e camaradas!",
  "npcMessages.findley.msg4":
    "Está tentando pegar um atum? Eles têm um gosto especial pelo crocante do couve-flor.",
  "npcMessages.findley.msg5":
    "A rivalidade de pesca é coisa de família. Estou aqui para provar algo. Iscas e camaradas, por favor!",
  "npcMessages.findley.msg6":
    "Finn não é o único com habilidades de pesca. Estou mirando na captura da minha vida!",
  "npcMessages.findley.msg7":
    "Competir com Finn é obrigatório. Preciso da sua ajuda com iscas e camaradas!",
  "npcMessages.findley.msg8":
    "Uma competição de pesca entre irmãos e irmãs. Iscas e camaradas são minhas armas secretas!",
  "npcMessages.findley.msg9":
    "Você sabia que o Mahi Mahi não pode resistir ao crocante doce do milho?",
  // Corale
  "npcMessages.corale.msg1":
    "O oceano está me chamando, e eu preciso de peixes. Ajude-me a libertar meus amigos!",
  "npcMessages.corale.msg2":
    "Os peixes são meus amigos, e eu preciso libertá-los. Você vai me ajudar?",
  "npcMessages.corale.msg3":
    "Por amor ao mar, traga-me peixes. Eu os libertarei em seu habitat.",
  "npcMessages.corale.msg4":
    "Sob as ondas, meus amigos esperam. Peixes, para que eles possam nadar livremente!",
  "npcMessages.corale.msg5":
    "Um chamado de sereia para proteger seus amigos. Traga-me peixes, alma benevolente.",
  "npcMessages.corale.msg6":
    "A liberdade dos peixes é minha missão. Você vai me ajudar com os peixes?",
  "npcMessages.corale.msg7":
    "Junte-se a mim na dança da vida marinha. Peixes, para libertar meus amigos!",
  // Shelly
  "npcMessages.shelly.msg1":
    "Os Bumpkins estão desaparecendo, e eu temo que o Kraken seja a causa. Ajude-me a coletar seus tentáculos!",
  "npcMessages.shelly.msg2":
    "Os Bumpkins estão desaparecendo, e eu suspeito do Kraken. Você pode recuperar seus tentáculos, por favor?",
  "npcMessages.shelly.msg3":
    "O Kraken é uma ameaça, os Bumpkins estão desaparecendo. Traga seus tentáculos para mantê-los seguros.",
  "npcMessages.shelly.msg4":
    "O Kraken é ameaçador, os Bumpkins se foram. Traga seus tentáculos para a segurança deles.",
  "npcMessages.shelly.msg5":
    "Manter a praia segura é difícil com o Kraken. Ajude-me a proteger os Bumpkins, obtenha seus tentáculos.",
  "npcMessages.shelly.msg6":
    "Proteger os Bumpkins é meu dever, mas o Kraken me preocupa. Obtenha seus tentáculos para salvá-los.",
  "npcMessages.shelly.msg7":
    "O Kraken está causando pânico, os Bumpkins estão desaparecidos. Ajude-me a reunir seus tentáculos para mantê-los seguros!",
  "npcMessages.shelly.msg8":
    "A segurança dos Bumpkins é minha prioridade, e eu temo que o Kraken esteja envolvido. Os tentáculos podem fazer a diferença!",
};

const npc: Record<Npc, string> = {
  "npc.Modal.Hammer": "Reúnam-se, Bumpkins, um leilão está prestes a começar.",
  "npc.Modal.Marcus":
    "Ei! Você não tem permissão para entrar na minha casa. Não mexa nas minhas coisas de jeito nenhum!",
  "npc.Modal.Billy": "Oi a todos! Meu nome é Billy.",
  "npc.Modal.Billy.one":
    "Eu encontrei esses brotos jovens, mas não faço ideia do que fazer com eles.",
  "npc.Modal.Billy.two":
    "Aposto que eles têm algo a ver com os brotos de vermes que estão aparecendo ao redor da praça.",
  "npc.Modal.Readmore": "Saiba mais",
  "npc.Modal.Gabi": "Ei, Bumpkin!",
  "npc.Modal.Gabi.one":
    "Você parece criativo, já pensou em contribuir artisticamente para o jogo?",
  "npc.Modal.Craig": "Por que você está me olhando estranho?",
  "npc.Modal.Craig.one": "Tem algo nos meus dentes...",
};

const npcDialogues: Record<NpcDialogues, string> = {
  // Blacksmith Intro
  "npcDialogues.blacksmith.intro1":
    "O que você quer? Fale rápido; tempo é dinheiro.",
  "npcDialogues.blacksmith.intro2":
    "O que o traz à minha oficina? Estou ocupado, então seja rápido.",
  "npcDialogues.blacksmith.intro3":
    "Bem-vindo à minha humilde morada. O que o traz aqui?",
  "npcDialogues.blacksmith.intro4":
    "Declare seu objetivo. Estou ocupado, e não tenho tempo para conversa fiada. O que o traz à minha oficina?",
  // Blacksmith Positive Delivery
  "npcDialogues.blacksmith.positiveDelivery1":
    "Finalmente! Você trouxe os materiais de que preciso. Afaste-se; deixe-me trabalhar minha magia.",
  "npcDialogues.blacksmith.positiveDelivery2":
    "Ah, já era hora! Você adquiriu os itens exatos que eu estava procurando. Prepare-se para equipamentos feitos com precisão.",
  "npcDialogues.blacksmith.positiveDelivery3":
    "Ótimo. Você entregou os materiais de que preciso. Não vou decepcionar você; minhas criações serão notáveis.",
  "npcDialogues.blacksmith.positiveDelivery4":
    "Impressionante! Você conseguiu os componentes necessários. Vou transformá-los em maravilhas agrícolas!",
  "npcDialogues.blacksmith.positiveDelivery5":
    "Hmm, você realmente conseguiu encontrar o que eu queria. Bem feito.",
  // Blacksmith Negative Delivery
  "npcDialogues.blacksmith.negativeDelivery1":
    "Você não tem o que eu preciso? Tempo desperdiçado. Volte quando tiver o que é necessário.",
  "npcDialogues.blacksmith.negativeDelivery2":
    "Não, não, não. Você está sem materiais essenciais. Não desperdice meu tempo. Volte quando estiver pronto.",
  "npcDialogues.blacksmith.negativeDelivery3":
    "Inaceitável. Você não possui o que preciso. Não tenho tempo a perder com incompetência. Volte quando estiver capaz.",
  "npcDialogues.blacksmith.negativeDelivery4":
    "Insatisfatório. Você não tem o que preciso. Volte quando estiver pronto para cumprir sua parte do acordo.",
  "npcDialogues.blacksmith.negativeDelivery5":
    "Incompetência. Você está sem os materiais necessários. Não desperdice meu tempo; volte quando estiver preparado.",
  // Blacksmith NoOrder
  "npcDialogues.blacksmith.noOrder1":
    "Não há pedidos ativos para serem realizados no momento, mas se você precisar de ferramentas ou materiais para moldar, estou sempre aqui para ajudar. Fale e começaremos a trabalhar.",
  "npcDialogues.blacksmith.noOrder2":
    "Não há pedido específico da minha parte no momento, mas se você precisar de equipamentos sólidos ou materiais para trabalhar, sou o seu artesão.",
  // Betty Into
  "npcDialogues.betty.intro1":
    "Oi, raio de sol! Dia agitado no mercado. Vim ver se você tem os ingredientes que pedi. Você os trouxe?",
  "npcDialogues.betty.intro2":
    "Olá, olá! Estava esperando para ver se você tem os ingredientes que pedi. Você trouxe?",
  "npcDialogues.betty.intro3":
    "Bem-vindo ao mercado da Betty! Pronto para verificar se você tem os ingredientes de que preciso? Vamos ver o que você tem para me oferecer!",
  "npcDialogues.betty.intro4":
    "Ei, ei! Mal posso esperar para saber se você trouxe os ingredientes que pedi. Mostre-me o que você tem!",
  "npcDialogues.betty.intro5":
    "Saudações, meu amigo com dedos verdes! Estou empolgada para ver se você trouxe os ingredientes que pedi. O que há na sua cesta?",
  // Betty Positive Delivery
  "npcDialogues.betty.positiveDelivery1":
    "Uau! Você trouxe os ingredientes que pedi. Eles estão tão frescos e vibrantes quanto podem ser. Obrigado, meu gênio da jardinagem!",
  "npcDialogues.betty.positiveDelivery2":
    "É disso que estou falando! Você tem exatamente os ingredientes de que eu precisava. Você alegrará meu dia com sua entrega rápida. Obrigado!",
  "npcDialogues.betty.positiveDelivery3":
    "Oh, fantástico! São exatamente os ingredientes que pedi. O mercado ficará animado. Obrigado pelo seu trabalho árduo!",
  "npcDialogues.betty.positiveDelivery4":
    "Oh, meu jardim! Esses ingredientes estão absolutamente perfeitos. Você tem um talento para encontrar os melhores produtos. Obrigado, meu herói de dedos verdes!",
  "npcDialogues.betty.positiveDelivery5":
    "Parabéns! Você trouxe exatamente os ingredientes de que eu precisava. Mal posso esperar para usá-los para criar algo extraordinário. Obrigado pela entrega rápida!",
  // Betty Negative Delivery
  "npcDialogues.betty.negativeDelivery1":
    "Opsie-daisy! Parece que você não tem os ingredientes que pedi. Não tem problema, no entanto. Continue procurando, e encontraremos outra oportunidade.",
  "npcDialogues.betty.negativeDelivery2":
    "Oh, não! Parece que você não tem os ingredientes de que preciso no momento. Não se preocupe, no entanto. Acredito em sua astúcia. Volte quando tiver o que estou procurando!",
  "npcDialogues.betty.negativeDelivery3":
    "Ah, droga! Parece que você não tem os ingredientes que estou procurando no momento. Continue procurando, no entanto! Talvez da próxima vez tenhamos mais sorte.",
  "npcDialogues.betty.negativeDelivery4":
    "Oh, que pena! Parece que os ingredientes que você trouxe não correspondem ao que preciso. Mas não desanime; continue trabalhando e volte em breve.",
  "npcDialogues.betty.negativeDelivery5":
    "Oh, snapdragons! Parece que você não tem exatamente os ingredientes que estou procurando. Mas não se preocupe, meu amigo. Continue trabalhando duro, e comemoraremos quando você os encontrar!",
  // Betty NoOrder
  "npcDialogues.betty.noOrder1":
    "Não há pedido ativo para mim no momento, mas isso não me impede de oferecer as melhores sementes e colheitas. A qualquer momento, se precisar de algo, é só me dizer!",
  "npcDialogues.betty.noOrder2":
    "Não tenho um pedido específico agora, mas sempre estou à disposição com as melhores sementes e produtos. Se precisar de algo, é só pedir!",
  // Grimbly Intro
  "npcDialogues.grimbly.intro1":
    "Faminto. Preciso de comida. Você tem algo saboroso para um goblim faminto?",
  "npcDialogues.grimbly.intro2":
    "Goblim faminto precisa de sustento. Você tem o que eu preciso?",
  "npcDialogues.grimbly.intro3":
    "Goblim faminto aqui. Você tem algo delicioso para eu beliscar?",
  "npcDialogues.grimbly.intro4":
    "Grimbly está com fome. Você trouxe algo saboroso para mim?",
  // Grimbly Positive Delivery
  "npcDialogues.grimbly.positiveDelivery1":
    "Ah, finalmente! Algo delicioso para saciar minha fome. Você é um salvador, meu amigo!",
  "npcDialogues.grimbly.positiveDelivery2":
    "Você trouxe comida! A fome de Grimbly está aplacada. Obrigado, obrigado!",
  "npcDialogues.grimbly.positiveDelivery3":
    "Uhu! Você me trouxe comida para encher minha barriga faminta. Grimbly aprecia sua generosidade!",
  "npcDialogues.grimbly.positiveDelivery4":
    "Um festim para Grimbly! Você trouxe exatamente o que eu precisava. Sua bondade não será esquecida!",
  // Grimbly Negative Delivery
  "npcDialogues.grimbly.negativeDelivery1":
    "Sem comida? Grimbly está sempre com fome. Encontre comida, traga comida. Grimbly é grato.",
  "npcDialogues.grimbly.negativeDelivery2":
    "Sem comida para Grimbly? A barriga de Grimbly está roncando. Volte quando encontrar algo saboroso.",
  "npcDialogues.grimbly.negativeDelivery3":
    "Grimbly está sempre com fome. Sem comida? Continue procurando, e talvez na próxima vez você satisfaça meu apetite de goblim.",
  "npcDialogues.grimbly.negativeDelivery4":
    "Mãos vazias? A barriga de Grimbly está roncando. Continue procurando e não esqueça da fome de um goblim!",
  // Grimbly NoOrder
  "npcDialogues.grimbly.noOrder1":
    "Grimbly não tem um pedido ativo para você, mas isso não significa que eu não esteja com fome!",
  "npcDialogues.grimbly.noOrder2":
    "Nenhum pedido ativo de Grimbly hoje, mas não se preocupe! Eu ainda estou de olho em guloseimas saborosas. Se você encontrar algo delicioso, você sabe para quem trazer!",
  // Grimtooth Intro
  "npcDialogues.grimtooth.intro1":
    "Saudações, viajante cansado. Você está me procurando, não está?",
  "npcDialogues.grimtooth.intro2":
    "Entre no reino das sombras. Você completou meu pedido?",
  "npcDialogues.grimtooth.intro3":
    "Bem-vindo, vagabundo, ao meu reino místico. Você tem o que eu preciso?",
  "npcDialogues.grimtooth.intro4":
    "Entre, querido viajante, e descubra os segredos que eu acumulei. Você encontrou o que eu pedi?",
  // Grimtooth Positive Delivery
  "npcDialogues.grimtooth.positiveDelivery1":
    "Incrível! Você encontrou os ingredientes que eu preciso. A magia de Sunflorea está ao alcance dos seus dedos!",
  "npcDialogues.grimtooth.positiveDelivery2":
    "Maravilhoso! Você adquiriu o que eu estava procurando. Juntos, mergulharemos nas profundezas mais obscuras da magia!",
  "npcDialogues.grimtooth.positiveDelivery3":
    "Incrível! Você reuniu os componentes místicos que eu precisava. Sua jornada no reino da magia está começando!",
  "npcDialogues.grimtooth.positiveDelivery4":
    "Ah, esplêndido! Você obteve os ingredientes insaisíveis que eu procurava. Sua jornada no reino da magia está começando!",
  // Grimtooth Negative Delivery
  "npcDialogues.grimtooth.negativeDelivery1":
    "Infelizmente, os ingredientes necessários escaparam de você. Não tema, no entanto. Continue procurando, e os mistérios serão revelados!",
  "npcDialogues.grimtooth.negativeDelivery2":
    "Oh, trevas e desespero. Você não possui o que eu preciso. Volte quando o tiver.",
  "npcDialogues.grimtooth.negativeDelivery3":
    "Não tenha medo, no entanto. Continue seu trabalho, e a magia se manifestará.",
  "npcDialogues.grimtooth.negativeDelivery4":
    "Oh, lamentavelmente. Você não possui o que eu preciso. Volte quando o tiver.",
  // Grimtooth NoOrder
  "npcDialogues.grimtooth.noOrder1":
    "Nenhum pedido ativo de GrimTooth no momento, mas não se preocupe. Se você precisar de um trabalho de artesanato requintado ou tiver materiais para trabalhar, estarei aqui, pronto para criar.",
  "npcDialogues.grimtooth.noOrder2":
    "Nenhum pedido ativo para realizar com GrimTooth, mas se você precisar do toque de um mestre artesão ou tiver materiais para transformar, estou à sua disposição.",
  // Old Salty Intro
  "npcDialogues.oldSalty.intro1":
    "Arghhhh, bem-vindo, meu coração! Old Salty, esse é o meu nome, e tesouro é o meu jogo. Você tem o que estou procurando?",
  "npcDialogues.oldSalty.intro2":
    "Ahoy, terrestre! Old Salty, é o entusiasta do tesouro que você procura. Mostre-me o que você encontrou em sua busca?",
  "npcDialogues.oldSalty.intro3": "",
  // Old Salty Positive Delivery
  "npcDialogues.oldSalty.positiveDelivery1":
    "Arghhhh, você encontrou o tesouro que estou procurando. Você tem o coração de um verdadeiro aventureiro, meu amigo!",
  "npcDialogues.oldSalty.positiveDelivery2":
    "Avast! Você trouxe o tesouro que Old Salty deseja. Você ganha o meu respeito, meu coração!",
  "npcDialogues.oldSalty.positiveDelivery3":
    "Ahoy, você encontrou o tesouro que Old Salty está caçando. Você é uma verdadeira lenda nestas águas, meu coração!",
  //  Olkd Salty Negative Delivery
  "npcDialogues.oldSalty.negativeDelivery1":
    "Arrrr, nenhum tesouro para Old Salty? Mantenha os olhos bem abertos, meu coração. As jóias escondidas esperam pela sua descoberta!",
  "npcDialogues.oldSalty.negativeDelivery2":
    "Ah, canalha! Nenhum tesouro para Old Salty? Continue procurando, e você encontrará as riquezas que está procurando!",
  "npcDialogues.oldSalty.negativeDelivery3":
    "Shiver me timbers! Nenhum tesouro para Old Salty? Continue navegando, meu amigo. O saque está lá fora, esperando por você!",
  // Old Salty NoOrder
  "npcDialogues.oldSalty.noOrder1":
    "Nenhum pedido ativo para o tesouro de Old Salty no momento, meu coração, mas isso não significa que não haja aventura a ser vivida. Mantenha os olhos abertos para os tesouros escondidos e as águas inexploradas!",
  "npcDialogues.oldSalty.noOrder2":
    "Nenhum tesouro específico para procurar com Old Salty no momento, mas não se preocupe, meu marinheiro corajoso! Os mares altos estão cheios de riquezas incontáveis esperando para serem descobertas.",
  // Raven Intro
  "npcDialogues.raven.intro1":
    "Bem-vindo à minha humilde morada. Cuidado onde pisa; poções estão em preparação. Você obteve o que eu pedi?",
  "npcDialogues.raven.intro2":
    "Adentre o reino das sombras. Busque a sabedoria, encontre o encantamento. Você tem o que eu preciso?",
  "npcDialogues.raven.intro3":
    "Bem-vindo, vagabundo, ao meu reino místico. Você está buscando algo mágico, ou tem o que eu preciso?",
  "npcDialogues.raven.intro4":
    "Entre, querido viajante. As sombras o guiarão. Você encontrou o que estou procurando?",
  // Raven Positive Delivery
  "npcDialogues.raven.positiveDelivery1":
    "Incrível! Você encontrou os ingredientes de que preciso. A magia de Sunflorea está ao alcance de seus dedos!",
  "npcDialogues.raven.positiveDelivery2":
    "Maravilhoso! Você adquiriu o que eu procurava. Juntos, mergulharemos nas profundezas mais escuras da magia!",
  "npcDialogues.raven.positiveDelivery3":
    "Incrível! Você reuniu os componentes místicos de que eu precisava. Sua jornada pelo reino da magia começa agora!",
  "npcDialogues.raven.positiveDelivery4":
    "Ah, esplêndido! Você obteve os ingredientes insaisíveis que eu procurava. Sua jornada pelo reino da magia começa agora!",
  // Raven Negative Delivery
  "npcDialogues.raven.negativeDelivery1":
    "Infelizmente, os ingredientes necessários escapam de você. Não tema, no entanto. Continue procurando, e os mistérios se revelarão!",
  "npcDialogues.raven.negativeDelivery2":
    "Oh, trevas e desespero. Você não possui o que eu preciso. Mas não se preocupe; as sombras o guiarão até o que você precisa.",
  "npcDialogues.raven.negativeDelivery3":
    "Não tema, no entanto. Continue sua busca, e a magia se manifestará.",
  // Raven NoOrder
  "npcDialogues.raven.noOrder1":
    "Parece que não há um pedido ativo esperando por você em meu domínio sombrio. No entanto, se você procura orientação ou tem dúvidas sobre as artes místicas, não hesite em perguntar.",
  "npcDialogues.raven.noOrder2":
    "Nenhum pedido ativo da minha parte, viajante. Mas não se preocupe! As sombras estão sempre vigiando, e quando chegar a hora, mergulharemos juntos nas profundezas da magia.",
  // Tywin Intro
  "npcDialogues.tywin.intro1":
    "Ah, outro plebeu honrando minha presença. Você tem o que eu quero? Fale rápido.",
  "npcDialogues.tywin.intro2":
    "Oh, maravilhoso, outro da plebe. Qual é o seu negócio com alguém da minha estatura? Você tem o que eu preciso?",
  "npcDialogues.tywin.intro3":
    "Saudações, plebeu. Você busca sabedoria, não é? Você tem tudo o que eu pedi?",
  "npcDialogues.tywin.intro4":
    "O que você quer? Fale rápido; tempo é dinheiro. Você tem o que eu preciso, imagino?",
  // Tywin Positive Delivery
  "npcDialogues.tywin.positiveDelivery1":
    "Hmm, parece que você não é completamente inútil. Você conseguiu trazer o que eu queria. Continue, camponês!",
  "npcDialogues.tywin.positiveDelivery2":
    "Surpreendentemente, você realmente entregou o que eu desejava. Talvez você não seja tão inútil quanto eu pensava.",
  "npcDialogues.tywin.positiveDelivery3":
    "Ah, trabalho maravilhoso! Você trouxe os materiais de que eu preciso. Juntos, criaremos obras-primas!",
  "npcDialogues.tywin.positiveDelivery4":
    "Bem. Você entregou os materiais de que preciso. Igor não ficará desapontado; as ferramentas serão notáveis.",
  // Tywin Negative Delivery
  "npcDialogues.tywin.negativeDelivery1":
    "Patético. Você não tem o que eu pedi. Não perca meu tempo com sua incompetência. Vá embora!",
  "npcDialogues.tywin.negativeDelivery2":
    "Que decepção. Você não tem o que eu pedi. Típico da sua espécie. Agora vá embora!",
  "npcDialogues.tywin.negativeDelivery3":
    "Insatisfatório. Você não possui o que eu preciso. Eu não tenho tempo para incompetência. Volte quando estiver preparado.",
  "npcDialogues.tywin.negativeDelivery4":
    "Incompetência. Você está faltando com os materiais necessários. Não perca meu tempo; volte quando estiver preparado.",
  // Tywin NoOrder
  "npcDialogues.tywin.noOrder1":
    "Ah, parece que eu não tenho um pedido ativo para você, plebeu. Mas se você precisar da minha estimada presença ou tiver uma solicitação, fale logo. Afinal, tempo é dinheiro.",
  "npcDialogues.tywin.noOrder2":
    "Nenhum pedido ativo para você hoje, camponês. No entanto, se você encontrar algo digno da minha atenção ou precisar da minha expertise, você sabe onde me encontrar.",
  //Bert Intro
  "npcDialogues.bert.intro1":
    "Psst! Explorador do arcano! Os vastos segredos de Sunflorea são muitos...",
  "npcDialogues.bert.intro2":
    "Ah, espírito semelhante! Sunflorea é o lar de inúmeros tesouros...",
  "npcDialogues.bert.intro3":
    "Saudações, portador do misterioso! Em Sunflorea, alguns itens requerem entrega...",
  "npcDialogues.bert.intro4":
    "Olá, buscador do oculto! Os encantamentos de Sunflorea podem ser classificados em dois...",
  "bert.day":
    "Você não pode retirar este item por 3 dias após a reivindicação.",
  //Bert Positive Delivery
  "npcDialogues.bert.positiveDelivery1":
    "Incrível! Você trouxe exatamente o que eu precisava...",
  "npcDialogues.bert.positiveDelivery2":
    "Oh, descoberta fascinante! Você trouxe exatamente os itens que eu estava procurando...",
  "npcDialogues.bert.positiveDelivery3":
    "Ah, era hora! Você conseguiu exatamente o que eu estava procurando. Excelente!",
  "npcDialogues.bert.positiveDelivery4":
    "Impressionante! Você trouxe exatamente o que eu preciso para desvendar os segredos de Sunflorea.",
  //Bert Negative Delivery
  "npcDialogues.bert.negativeDelivery1":
    "Oh, infelizmente. Você não tem o que estou procurando. Continue explorando, eu verei você quando tiver o que eu preciso!",
  "npcDialogues.bert.negativeDelivery2":
    "Droga! O que você tem não é exatamente o que eu preciso. Continue trabalhando na minha entrega e juntos desvendaremos os mistérios!",
  "npcDialogues.bert.negativeDelivery3":
    "Hmm, não é exatamente o que eu esperava. Mas não se preocupe! Ainda há tempo para conseguir o que eu preciso.",
  "npcDialogues.bert.negativeDelivery4":
    "Oh, não é exatamente o que eu estava procurando. Volte quando tiver. Mas mantenha os olhos abertos; as páginas da história ainda têm muito a revelar.",
  //Bert NoOrder
  "npcDialogues.bert.noOrder1":
    "Nenhum pedido ativo para realizar para mim no momento, mas isso não significa que eu não tenha segredos intrigantes para compartilhar.",
  "npcDialogues.bert.noOrder2":
    "Nenhum artefato enigmático para descobrir com Bert no momento, mas isso não significa que eu não tenha fatos curiosos e verdades ocultas.",
  // Timmy Intro
  "npcDialogues.timmy.intro1":
    "Olá, amigo! Eu sou o Timmy e estou ansioso para ver se você tem o que eu pedi.",
  "npcDialogues.timmy.intro2":
    "Saudações, companheiro de aventuras! Aqui é o Timmy, perguntando se você encontrou o que eu pedi.",
  "npcDialogues.timmy.intro3":
    "Bem-vindo, bem-vindo! Eu sou o Timmy, o rosto mais amigável da cidade. Você pode me ajudar a verificar se tem o que eu preciso?",
  "npcDialogues.timmy.intro4":
    "Ei, ei! Pronto para um pouco de diversão ao sol? Eu sou o Timmy e estou ansioso para ver se você tem o que eu pedi.",
  "npcDialogues.timmy.intro5":
    "Olá, raio de sol! O Timmy está aqui, esperando que você tenha o que eu pedi. Vamos ver?",
  // Timmy Positive Delivery
  "npcDialogues.timmy.positiveDelivery1":
    "Uau! Você tem exatamente o que eu precisava. Sua generosidade enche meu coração de alegria. Obrigado!",
  "npcDialogues.timmy.positiveDelivery2":
    "É exatamente disso que estou falando! Você trouxe exatamente o que eu estava procurando. Você é uma superestrela!",
  "npcDialogues.timmy.positiveDelivery3":
    "Oh, fantástico! Sua hora não poderia ser melhor. Você alegrou meu dia com sua oferta atenciosa. Obrigado!",
  "npcDialogues.timmy.positiveDelivery4":
    "Urra! Você entregou o que foi pedido. Sunflorea tem sorte de ter alguém tão incrível como você!",
  "npcDialogues.timmy.positiveDelivery5":
    "Você conseguiu mais uma vez! Sua bondade e generosidade continuam a me surpreender. Obrigado por iluminar a cidade!",
  // Timmy Negative Delivery
  "npcDialogues.timmy.negativeDelivery1":
    "Ops! Parece que você não tem o que estou procurando no momento. Sem problemas, no entanto. Continue explorando e encontraremos outra oportunidade.",
  "npcDialogues.timmy.negativeDelivery2":
    "Oh, não! Parece que você não tem o que eu preciso no momento. Não se preocupe, porém. Eu acredito em você. Volte quando encontrar.",
  "npcDialogues.timmy.negativeDelivery3":
    "Ah, droga! Você não tem o que eu estou procurando no momento. Continue explorando, no entanto! Talvez na próxima vez você encontrará o que eu preciso.",
  "npcDialogues.timmy.negativeDelivery4":
    "Oh, que pena! Parece que você não tem o objeto que estou procurando. Mas não desista; novas oportunidades estão ao virar da esquina.",
  "npcDialogues.timmy.negativeDelivery5":
    "Oh, não! Você não tem o que estou procurando. Mas não se preocupe, meu amigo. Continue explorando e celebraremos quando encontrar.",
  // Timmy NoOrder
  "npcDialogues.timmy.noOrder1":
    "Oh, olá! Não tenho um pedido ativo para você no momento, mas estou sempre ansioso para ouvir histórias emocionantes. Você tem histórias empolgantes de suas aventuras em Sunflorea? Ou talvez você tenha feito um novo amigo urso? Compartilhe comigo!",
  "npcDialogues.timmy.noOrder2":
    "Não há um pedido específico para você realizar no momento, mas isso não me impede de ficar curioso! Você tem histórias interessantes sobre suas viagens? Talvez você tenha encontrado um urso raro ou descoberto uma joia escondida em Sunflorea? Vamos conversar!",
  // Cornwell Intro
  "npcDialogues.cornwell.intro1":
    "Saudações, jovem aventureiro! Você está trazendo os objetos que estou procurando?",
  "npcDialogues.cornwell.intro2":
    "Ah, seja bem-vindo, buscador de conhecimento e relíquias! Você tem os objetos que pedi? Mostre-me o que você tem.",
  "npcDialogues.cornwell.intro3":
    "Entre no reino dos segredos antigos e da sabedoria. Você adquiriu os objetos que desejo? Compartilhe suas descobertas comigo, jovem.",
  "npcDialogues.cornwell.intro4":
    "Ah, é você! O nobre buscador. Você encontrou os objetos que estou procurando? Venha, mostre-me o que você descobriu nas vastas terras de Sunflower Land.",
  "npcDialogues.cornwell.intro5":
    "Saudações, jovem viajante! Os ventos da curiosidade o trouxeram até aqui. Você tem os objetos de que preciso para enriquecer minha coleção?",
  // Cornwell Positive Delivery
  "npcDialogues.cornwell.positiveDelivery1":
    "Maravilhoso! Você trouxe as relíquias exatas que eu desejava. Seus esforços em preservar a história de Sunflower Land serão reconhecidos.",
  "npcDialogues.cornwell.positiveDelivery2":
    "Ah, esplêndido! Suas descobertas correspondem perfeitamente às relíquias que eu estava procurando. Esses tesouros acrescentarão grande sabedoria à minha coleção.",
  "npcDialogues.cornwell.positiveDelivery3":
    "Impressionante! Os objetos que você adquiriu são exatamente o que eu estava procurando. A história de Sunflower Land brilhará através deles.",
  "npcDialogues.cornwell.positiveDelivery4":
    "Ah, jovem aventureiro, você superou minhas expectativas! Os objetos que você trouxe serão de valor inestimável para minhas pesquisas.",
  "npcDialogues.cornwell.positiveDelivery5":
    "Ah, muito bem, meu amigo de olhos aguçados! Os objetos que você entregou terão um lugar de destaque na coleção do meu moinho.",
  // Cornwell Negative Delivery
  "npcDialogues.cornwell.negativeDelivery1":
    "Oh, parece que você não encontrou os objetos que estou procurando. Não se preocupe; a jornada da descoberta continua. Continue explorando os mistérios de Sunflower Land.",
  "npcDialogues.cornwell.negativeDelivery2":
    "Hmm, não são exatamente as relíquias que eu estava esperando. Mas não desanime! Continue procurando, e os tesouros de Sunflower Land se revelarão a você.",
  "npcDialogues.cornwell.negativeDelivery3":
    "Oh, parece que não são os objetos que estou procurando no momento. Mas não desista! Continue explorando e trazendo sabedoria para minha coleção.",
  "npcDialogues.cornwell.negativeDelivery4":
    "Parece que não são os objetos certos desta vez. Não se preocupe, meu jovem amigo. Continue sua jornada e encontraremos tesouros juntos.",
  "npcDialogues.cornwell.negativeDelivery5":
    "Hmm, infelizmente, esses não são os objetos que eu estava esperando. Mas não se deixe abater. A busca por conhecimento nunca termina.",
  // Cornwell NoOrder
  "npcDialogues.cornwell.noOrder1":
    "Ah, parece que não há missões de entrega para você no momento. Mas não desanime! Sua jornada em Sunflower Land está cheia de aventuras inéditas para descobrir.",
  "npcDialogues.cornwell.noOrder2":
    "Oh, parece que não preciso dos seus serviços no momento. Mas não se preocupe; as páginas da história de Sunflower Land estão sempre virando, e novas missões certamente surgirão.",
  "npcDialogues.cornwell.noOrder3":
    "Ah, minhas desculpas, mas não tenho nada para você fazer no momento. Não se preocupe, no entanto; seu caminho como buscador de conhecimento o levará a novas missões no devido tempo.",
  "npcDialogues.cornwell.noOrder4":
    "Ah, parece que você não recebeu missões de entrega de mim no momento. Mas não perca a esperança; sua natureza curiosa logo o guiará para emocionantes novas missões em Sunflower Land.",
  // Pumpkin Pete Intor
  "npcDialogues.pumpkinPete.intro1":
    "Eu estava esperando por você, meu amigo! Você tem meu pedido pronto?",
  "npcDialogues.pumpkinPete.intro2":
    "Oi, abóbora! Eu estava ocupado guiando os Bumpkins ao redor da praça. Você conseguiu meu pedido?",
  "npcDialogues.pumpkinPete.intro3":
    "Saudações, amigo! A praça está cheia de empolgação hoje. Você conseguiu pegar meu pedido?",
  "npcDialogues.pumpkinPete.intro4":
    "Olá, companheiro de aventura! O que o traz à minha humilde morada? Você conseguiu meu pedido?",
  "npcDialogues.pumpkinPete.intro5":
    "Ei, ei! Bem-vindo à praça. Você conseguiu encontrar o que eu preciso?",
  // Pumpkin Pete Positive Delivery
  "npcDialogues.pumpkinPete.positiveDelivery1":
    "Uau! Você trouxe exatamente o que eu precisava. Você é um verdadeiro herói da praça!",
  "npcDialogues.pumpkinPete.positiveDelivery2":
    "Abóbora-tástico! Você tem exatamente o que eu preciso. Você torna nossa pequena comunidade mais brilhante!",
  "npcDialogues.pumpkinPete.positiveDelivery3":
    "Sementes de alegria! Você trouxe exatamente o que eu precisava. A praça tem sorte de tê-lo!",
  "npcDialogues.pumpkinPete.positiveDelivery4":
    "Fantástico! Você chegou com exatamente o que eu desejava. Sua bondade espalha a luz do sol em nossa praça!",
  "npcDialogues.pumpkinPete.positiveDelivery5":
    "Oh, sementes de alegria de abóbora! Você trouxe exatamente o que eu precisava. A praça agradece por sua ajuda!",
  // Pumpkin Pete Negative Delivery
  "npcDialogues.pumpkinPete.negativeDelivery1":
    "Oh, não. Parece que você não tem o que estou procurando. Mas não se preocupe, acredito em você. Volte quando tiver encontrado!",
  "npcDialogues.pumpkinPete.negativeDelivery2":
    "Ah, droga! Você não tem o que estou procurando no momento. Continue explorando, no entanto! Talvez da próxima vez.",
  "npcDialogues.pumpkinPete.negativeDelivery3":
    "Oh, sementes de tristeza! Você não tem o que estou procurando. Mas não desista; novas oportunidades surgem todos os dias!",
  "npcDialogues.pumpkinPete.negativeDelivery4":
    "Oh, lírios-do-vale! Você não tem o que estou procurando no momento. Continue explorando, no entanto! Tenho certeza de que encontrará.",
  "npcDialogues.pumpkinPete.negativeDelivery5":
    "Opa-daisy! Você não tem o que estou procurando. Mas não se preocupe, meu amigo. Continue explorando, e celebraremos quando encontrar.",
  // Pumpkin Pete NoOrder
  "npcDialogues.pumpkinPete.noOrder1":
    "Ah, meu amigo, parece que não tenho um pedido ativo para você no momento. Mas não se preocupe! Estou sempre aqui para oferecer conselhos e um sorriso amigável de abóbora.",
  "npcDialogues.pumpkinPete.noOrder2":
    "Oh, sem pedido ativo para você hoje, meu amigo. Mas não se preocupe! Sinta-se à vontade para explorar a praça, e se precisar de ajuda, estou aqui, seu Bumpkin de confiança.",
};

const nyeButton: Record<NyeButton, string> = {
  "plaza.magicButton.query":
    "Um botão mágico apareceu na praça. Você quer apertá-lo?",
};

const pirateQuest: Record<PirateQuest, string> = {
  "questDescription.farmerQuest1": "Colha 1000 girassóis",
  "questDescription.fruitQuest1": "Colha 10 mirtilos",
  "questDescription.fruitQuest2": "Colha 100 laranjas",
  "questDescription.fruitQuest3": "Colha 750 maçãs",
  "questDescription.pirateQuest1": "Cave 30 buracos",
  "questDescription.pirateQuest2": "Colete 10 algas",
  "questDescription.pirateQuest3": "Colete 10 Pipis",
  "questDescription.pirateQuest4": "Colete 5 corais",
};

const obsessionDialogue: Record<ObsessionDialogue, string> = {
  "obsessionDialogue.line1.part1": "Ah, o",
  "obsessionDialogue.line1.part2":
    "! Eu só desejo vê-lo, não possuir. Mostre-o para mim, e",
  "obsessionDialogue.line1.part3": "s serão sua recompensa.",

  "obsessionDialogue.line2.part1": "Você trouxe o",
  "obsessionDialogue.line2.part2":
    "? Eu apenas quero contemplá-lo. Deixe-me ver, e",
  "obsessionDialogue.line2.part3": "s serão seus.",

  "obsessionDialogue.line3.part1": "É o",
  "obsessionDialogue.line3.part2":
    " que você tem? Um simples olhar é tudo o que eu desejo. Por isso, você receberá",
  "obsessionDialogue.line3.part3": "s.",

  "obsessionDialogue.line4.part1": "O",
  "obsessionDialogue.line4.part2":
    "! Eu não quero mantê-lo, apenas contemplá-lo. Mostre-o para mim, e",
  "obsessionDialogue.line4.part3": "s serão seus.",

  "obsessionDialogue.line5.part1": "Você oferece uma visão do",
  "obsessionDialogue.line5.part2":
    "? Tudo o que peço é para vê-lo brevemente. Pela sua generosidade,",
  "obsessionDialogue.line5.part3": "s serão concedidos a você.",
};

const offer: Record<Offer, string> = {
  "offer.okxOffer":
    "Olá, fazendeiro! Tenho uma oferta exclusiva da OKX para você!",
  "offer.beginWithNFT":
    "Para começar, você precisará obter um NFT de fazenda gratuito. Isso incluirá:",
  "offer.getStarterPack": "Obtenha o Pacote Inicial Agora",
  "offer.newHere": "Olá, fazendeiro! Você parece ser novo aqui!",
  "offer.getStarted": "Comece Agora",
  "offer.NFT.inclu": "NFT da fazenda. Isso incluirá:",
};

const onboarding: Record<Onboarding, string> = {
  "onboarding.welcome": "Bem-vindo ao jogo descentralizado!",
  "onboarding.step.one": "Passo 1/3",
  "onboarding.step.two": "Passo 2/3 (Criar uma carteira)",
  "onboarding.step.three": "Passo 3/3 (Criar seu NFT)",
  "onboarding.intro.one":
    "Durante suas jornadas, você ganhará NFTs raros que precisam ser protegidos. Para protegê-los, você precisará de uma carteira Web3.",
  "onboarding.intro.two": "Para começar sua jornada, sua carteira receberá:",
  "onboarding.cheer": "Você está quase lá!",
  "onboarding.form.one": "Preencha seus dados",
  "onboarding.form.two":
    "e enviaremos um NFT gratuito para você jogar. Isso levará de 3 a 7 dias.",
  "onboarding.duplicateUser.one": "Já registrado!",
  "onboarding.duplicateUser.two":
    "Parece que você já se registrou para os testes beta usando um endereço diferente. Apenas um endereço pode ser usado durante os testes beta.",
  "onboarding.starterPack": "Pacote Inicial",
  "onboarding.wallet.titleOne": "Configurando sua carteira",
  "onboarding.wallet.one":
    "Existem muitos provedores de carteiras, mas escolhemos a Sequence porque são fáceis de usar e seguros.",
  "onboarding.wallet.two":
    "Escolha um método de inscrição na janela pop-up e você estará pronto. Vejo você aqui em breve!",
  "onboarding.wallet.haveWallet": "Já tenho uma carteira",
  "onboarding.wallet.createButton": "Criar uma carteira",
  "onboarding.wallet.titleTwo": "Aceitar os termos de uso",
  "onboarding.wallet.three":
    "Para comprar sua fazenda, você precisará aceitar os termos de uso do Sunflower Land.",
  "onboarding.wallet.four":
    "Esta etapa o levará de volta à sua nova carteira Sequence para aceitar os termos de uso.",
  "onboarding.wallet.acceptButton": "Aceitar os termos de uso",
  "onboarding.wallet.acceptLoading": "Aceitando os termos...",
  "onboarding.wallet.titleThree": "Compre sua fazenda!",
  "onboarding.wallet.five":
    "Agora que sua carteira está configurada, é hora de obter seu próprio NFT de fazenda!",
  "onboarding.wallet.six":
    "Este NFT armazenará com segurança todo o seu progresso no Sunflower Land e permitirá que você volte para cuidar de sua fazenda.",
  "onboarding.wallet.final": "Vamos lá!",
  "onboarding.wallet.already": "Já tenho uma carteira",
};

const onCollectReward: Record<OnCollectReward, string> = {
  "onCollectReward.Missing.Seed": "Sementes em falta",
  "onCollectReward.Market": "Vá ao mercado para comprar sementes.",
  "onCollectReward.Missing.Shovel": "Pá em falta",
};

const orderhelp: Record<OrderHelp, string> = {
  "orderhelp.Skip.hour": "Você só pode fazer um pedido após 24 horas!",
  "orderhelp.New.Season":
    "Uma nova temporada está chegando, as entregas serão temporariamente fechadas.",
  "orderhelp.New.Season.arrival": "Abertura em breve das Entregas Sazonais.",
  "orderhelp.Wisely": "Escolha sabiamente!",
  "orderhelp.SkipIn": "Pular em",
  "orderhelp.NoRight": "Não por agora",
  "orderhelp.Skip.Order": "Pular Pedido",
};

const parsnip: Record<Parsnip, string> = {
  "parsnip.hat": "Wow, belos chifres!",
  "parsnip.miss": "Não perca os futuros eventos e presentes!",
  "parsnip.Bonus": "Bônus de recompensa",
  "parsnip.found": "Yay... você me encontrou!",
  "parsnip.gift": "Reivindicar presente",
};

const pending: Record<Pending, string> = {
  "pending.calcul": "Os resultados estão sendo calculados.",
  "pending.comeback": "Volte mais tarde.",
};

const personHood: Record<PersonHood, string> = {
  "personHood.Details.": "Falha ao carregar detalhes de identificação",
  "personHood.Identify": "Sua identidade não pôde ser verificada",
  "personHood.Congrat": "Parabéns, sua identidade foi verificada!",
};

const pickserver: Record<Pickserver, string> = {
  "pickserver.server": "Escolha um servidor para entrar",
  "pickserver.full": "CHEIO",
  "pickserver.explore": "Explore ilhas de projetos personalizados.",
  "pickserver.event": "Evento especial",
  "pickserver.built": "Quer construir sua própria ilha?",
};

const plazaSettings: Record<PlazaSettings, string> = {
  "plazaSettings.title.main": "Configurações da Praça",
  "plazaSettings.title.mutedPlayers": "Jogadores Silenciados",
  "plazaSettings.title.keybinds": "Atalhos de Teclado",
  "plazaSettings.mutedPlayers.description":
    "Se você silenciou alguns jogadores usando o comando /mute, você pode vê-los aqui e desmutá-los, se desejar.",
  "plazaSettings.mutedPlayers.button": "Jogadores Silenciados",
  "plazaSettings.keybinds.description":
    "Precisa conhecer os atalhos de teclado disponíveis? Consulte-os aqui.",
  "plazaSettings.keybinds.button": "Atalhos de Teclado",
  "plazaSettings.noMutedPlayers": "Você não tem nenhum jogador silenciado.",
  "plazaSettings.unmute": "Desmutar",
  "plazaSettings.back": "Voltar",
};

const playerTrade: Record<PlayerTrade, string> = {
  "playerTrade.loading": "Carregando",
  "playerTrade.no.trade": "Nenhuma troca disponível.",
  "playerTrade.max.item": "Oh não! Você atingiu o número máximo de itens.",
  "playerTrade.Progress":
    "Por favor, registre seu progresso na blockchain antes de continuar.",
  "playerTrade.transaction":
    "Oh oh! Parece que você tem uma transação em andamento.",
  "playerTrade.Please": "Por favor, aguarde 5 minutos antes de continuar.",
  "playerTrade.sold": "Vendido",
  "playerTrade.sale": "À venda:",
  "playerTrade.title.congrat": "Parabéns, seu anúncio foi comprado",
};

const portal: Record<Portal, string> = {
  "portal.wrong": "Ocorreu um problema",
  "portal.loading": "Carregando",
  "portal.unauthorised": "Não autorizado",
};

const purchaseableBaitTranslation: Record<PurchaseableBaitTranslation, string> =
  {
    "purchaseableBait.fishingLure.description":
      "Ideal para pegar peixes raros ! ",
  };

const quest: Record<Quest, string> = {
  "quest.mint.free": "Mint Des Wearable GRATUITAMENTE",
};

const questions: Record<Questions, string> = {
  "questions.obtain.MATIC": "Como obter MATIC?",
  "questions.lowCash": "Está com pouco dinheiro?",
};

const reaction: Record<Reaction, string> = {
  "reaction.bumpkin": "Bumpkin Nível 3",
  "reaction.bumpkin.10": "Bumpkin Nível 10",
  "reaction.bumpkin.30": "Bumpkin Nível 30",
  "reaction.bumpkin.40": "Bumpkin Nível 40",
  "reaction.sunflowers": "Colher 100.000 Girassóis",
  "reaction.crops": "Colher 10.000 Culturas",
  "reaction.goblin": "Transformar-se em Goblin",
  "reaction.crown": "Possuir uma Coroa de Goblin",
};

const refunded: Record<Refunded, string> = {
  "refunded.itemsReturned": "Seus itens foram devolvidos ao seu inventário.",
  "refunded.goodLuck": "Boa sorte na próxima vez!",
};

const removeKuebiko: Record<RemoveKuebiko, string> = {
  "removeKuebiko.title": "Remover Kuebiko",
  "removeKuebiko.description":
    "Esta ação removerá todas as suas sementes do seu inventário.",
  "removeKuebiko.removeSeeds": "Remover sementes",
};

const resale: Record<Resale, string> = {
  "resale.lookingForItems": "Procurando por itens raros?",
  "resale.actionText": "Revenda",
};

const restock: Record<Restock, string> = {
  "restock.one.buck":
    "Você usará 1 Block Buck para reabastecer todos os itens da loja no jogo.",
  "restock.sure": "Tem certeza de que deseja reabastecer?",
  "restock.seed.buy": "Você tem muitas sementes em seu carrinho!",
};

const retreatTerms: Record<RetreatTerms, string> = {
  "retreatTerms.introTravel.zero":
    "Antes de viajar, você precisa aumentar de nível.",
  "retreatTerms.introTravel.one": "Ei viajante! Pronto para explorar?",
  "retreatTerms.introTravel.two":
    "Sunflower Land está cheio de ilhas emocionantes onde você pode fazer entregas, criar NFTs raros e até mesmo procurar tesouros!",
  "retreatTerms.introTravel.three":
    "Diferentes lugares oferecem diferentes oportunidades para gastar seus recursos suados.",
  "retreatTerms.introTravel.four":
    "A qualquer momento, clique no botão de viagem para voltar para casa.",
  "retreatTerms.resale.title": "Procurando por itens raros?",
  "retreatTerms.resale.one":
    "Os jogadores podem trocar itens especiais que fabricaram no jogo.",
  "retreatTerms.resale.two":
    "Você pode comprá-los em mercados secundários como o OpenSea.",
  "retreatTerms.resale.three": "Veja os itens no OpenSea",
};

const rewardTerms: Record<RewardTerms, string> = {
  "reward.title": "Recompensa Diária",
  "reward.streak": " dias seguidos",
  "reward.comeBackLater": "Volte mais tarde para mais recompensas",
  "reward.nextBonus": " Próximo bônus: ",
  "reward.unlock": "Desbloquear recompensa",
  "reward.open": "Abrir recompensa",
  "reward.lvlRequirement":
    "Você precisa estar no nível 3 para reivindicar as recompensas diárias.",
  "reward.revealing": "O que poderia ser isso?",
  "reward.streakBonus": "Bônus de série de 3x",
  "reward.found": "Você encontrou",
  "reward.spendWisely": "Use com sabedoria.",
  "reward.wearable": "Um acessório para o seu Bumpkin",
  "reward.woohoo": "Uhuu! Aqui está sua recompensa",
  "reward.connectWeb3Wallet":
    "Conecte uma carteira Web3 para receber uma recompensa diária.",
};

const rulesGameStart: Record<RulesGameStart, string> = {
  "rules.gameStart":
    "No início do jogo, a planta escolherá aleatoriamente uma combinação de 4 poções e 1 poção 'caos'. A combinação pode ser totalmente diferente ou igual.",
  "rules.potionRuleOne":
    "Objetivo: Determinar a combinação. Você tem 3 tentativas para acertar. O jogo termina se você conseguir uma poção perfeita ou se esgotar todas as tentativas.",
  "rules.potionRuleTwo":
    "Escolha uma combinação de poções e tente misturá-las.",
  "rules.potionRuleThree":
    "Ajuste sua próxima combinação com base nos feedbacks recebidos.",
  "rules.chaosPotionRule":
    "Se você adicionar a poção 'caos', sua pontuação para esta tentativa será 0.",
  "rules.potionRuleFour":
    "Quando o jogo terminar, a pontuação de sua última tentativa ajudará a determinar sua recompensa.",
  "rules.feedbackIconsIntro": "Fique atento aos ícones de feedback:",
  "rules.correctPotion": "Uma poção perfeita na posição perfeita",
  "rules.almostCorrectPotion": "Poção correta, mas na posição errada",
  "rules.incorrectPotion": "Ops, poção errada",
  "rules.chaosPotionWarning": "Cuidado com a poção 'caos', ela muda tudo!",
  "rules.potion.feedback":
    "Selecione suas poções e revele os segredos das plantas",
  "BloomBoost.description": "Acenda suas plantas com flores vibrantes!",
  "DreamDrip.description": "Regue suas plantas com sonhos mágicos e fantasias.",
  "EarthEssence.description":
    "Utilize o poder da terra para nutrir suas plantas.",
  "FlowerPower.description":
    "Libere uma explosão de energia floral em suas plantas.",
  "SilverSyrup.description":
    "Um xarope doce para trazer o melhor em suas plantas.",
  "HappyHooch.description":
    "Uma poção para trazer alegria e risadas para suas plantas.",
  "OrganicOasis.description":
    "Crie um paraíso orgânico exuberante para suas plantas.",
};

const rulesTerms: Record<RulesTerms, string> = {
  rules: "Regras do jogo",
  "rules.accounts": "1 conta por jogador",
  "rules.noBots": "Sem bots ou automação",
  "rules.game": "Isso é um jogo, não um produto financeiro",
  "rules.termsOfService": "Termos de Serviço",
};

const sceneDialogueKey: Record<SceneDialogueKey, string> = {
  "sceneDialogues.chefIsBusy": "O chef está ocupado",
};

const seasonTerms: Record<SeasonTerms, string> = {
  "season.accessTo": "Você tem acesso a:",
  "season.banner": "Banner sazonal",
  "season.bonusTickets": "Bilhetes de bônus sazonais",
  "season.boostXP": "+10% de EXP a partir de alimentos",
  "season.buyNow": "Compre agora",
  "season.discount": "Desconto de 25% em itens sazonais de SFL",
  "season.exclusiveOffer": "Oferta exclusiva!",
  "season.goodLuck": "Boa sorte na temporada!",
  "season.includes": "Inclui:",
  "season.limitedOffer": "Oferta por tempo limitado!",
  "season.wearableAirdrop": "Lançamento de roupas sazonais",
  "season.ctk": "Capture o Kraken",
};

const session: Record<Session, string> = {
  "session.expired": "Sessão expirada!",
  "session.expiredMessage":
    "Parece que sua sessão expirou. Por favor, atualize a página para continuar jogando.",
};

const settingsMenu: Record<SettingsMenu, string> = {
  "settingsMenu.timeMachine": "Máquina do tempo",
  "settingsMenu.storeOnChain": "Armazenar na cadeia",
  "settingsMenu.howToPlay": "Como jogar?",
  "settingsMenu.community": "Comunidade",
  "settingsMenu.swapMaticForSFL": "Trocar MATIC por SFL",
  "settingsMenu.plazaSettings": "Configurações da Plaza",
  "settingsMenu.advanced": "Avançado",
  "settingsMenu.settings": "Configurações",
  "settingsMenu.communityGarden": "Jardim Comunitário",
  "settingsMenu.share": "Compartilhar",
  "settingsMenu.logout": "Sair",
  "settingsMenu.confirmLogout": "Tem certeza de que deseja sair?",
};

const share: Record<Share, string> = {
  "share.TweetText": "Visite minha fazenda Sunflower Land",
  "share.ShareYourFarmLink": "Compartilhe o link de sua fazenda",
  "share.ShowOffToFarmers":
    "Mostre sua fazenda para outros agricultores compartilhando o link (URL) de sua fazenda para uma visita direta!",
  "share.FarmNFTImageAlt": "Imagem NFT da fazenda Sunflower-Land",
  "share.CopyFarmURL": "Copiar URL da fazenda",
  "share.Tweet": "Tweetar",
  "share.Visit": "Visitar",
};

const sharkBumpkinDialogues: Record<SharkBumpkinDialogues, string> = {
  "sharkBumpkin.dialogue.shhhh": "Shhh!",
  "sharkBumpkin.dialogue.scareGoblins": "Estou tentando assustar os duendes.",
};

const shelly: Record<Shelly, string> = {
  "shelly.Dialogue.one": "Olá, Bumpkin! Bem-vindo à praia!",
  "shelly.Dialogue.two":
    "Depois de um dia duro de trabalho na fazenda, não há lugar melhor para relaxar e pegar algumas ondas.",
  "shelly.Dialogue.three":
    "Mas temos um pequeno problema. Um kraken gigante apareceu e tomou conta de nossa amada praia.",
  "shelly.Dialogue.four":
    "Realmente precisamos de sua ajuda, querido. Pegue suas iscas e suas varas de pescar, e juntos vamos lidar com esse problema colossal!",
  "shelly.Dialogue.five":
    "Para cada tentáculo que você pegar, vou fornecer escalas de sereia preciosas para você!",
  "shelly.Dialogue.letsgo": "Vamos lá!",
};

const shellyDialogue: Record<ShellyDialogue, string> = {
  "shellyPanelContent.tasksFrozen":
    "Estou esperando o início da nova temporada. Volte a me ver naquela época!",
  "shellyPanelContent.canTrade":
    "Uau, você tem um Tentáculo de Kraken! Vou trocá-lo por escalas de sereia.",
  "shellyPanelContent.cannotTrade":
    "Parece que você não tem Tentáculos de Kraken disponíveis! Volte quando tiver algum.",
  "shellyPanelContent.swap": "Trocar",
  "shellyPanelContent.close": "Fechar",
  "krakenIntro.congrats":
    "Bem feito! O Kraken parou de aterrorizar os Bumpkins.",
  "krakenIntro.noMoreTentacles":
    "Você coletou todos os tentáculos da semana. Vamos ficar de olho, tenho certeza de que ele vai ficar com fome novamente.",
  "krakenIntro.gotIt": "Entendi!",
  "krakenIntro.appetiteChanges": "O apetite do Kraken muda constantemente.",
  "krakenIntro.currentHunger":
    "No momento, ele está com fome de.... Uau, é melhor do que Bumpkins.",
  "krakenIntro.catchInstruction":
    "Vá para o seu local de pesca e tente pegar a fera!",
};

const shopItems: Record<ShopItems, string> = {
  "shopItems.one": "Hey, hey! Bom te ver novamente...",
  "shopItems.two":
    "Você ajudou a resolver a escassez de culturas, e os preços voltaram ao normal.",
  "shopItems.three": "É hora de passar para culturas maiores e melhores!",
  "betty.intro": "Bem-vindo ao meu mercado. O que você gostaria de fazer?",
  "betty.buySeeds": "Comprar sementes",
  "betty.sellCrops": "Vender colheitas",
};

const showingFarm: Record<ShowingFarm, string> = {
  "showing.farm": "Exibido na fazenda",
  "showing.wallet": "Na carteira",
};

const snorklerDialogues: Record<SnorklerDialogues, string> = {
  "snorkler.vastOcean": "É um oceano vasto!",
  "snorkler.goldBeneath": "Deve haver ouro em algum lugar sob a superfície.",
};

const statements: Record<Statements, string> = {
  "statements.adventure": "Inicie sua aventura!",
  "statements.auctioneer.one":
    "Explorei vastas extensões da Sunflower Land em busca de tesouros exóticos para compartilhar com meus colegas Bumpkins.",
  "statements.auctioneer.two":
    "Não perca nossos leilões, onde o golpe do meu poderoso martelo pode transformar seus recursos ganhos com dificuldade em maravilhas raras e mintadas!",
  "statements.beta.one":
    "A beta está disponível apenas para os agricultores OG.",
  "statements.beta.two":
    "Fique ligado para atualizações. Estaremos ao vivo em breve!",
  "statements.better.luck": "Boa sorte na próxima vez!",
  "statements.blacklist.one":
    "O sistema de detecção anti-bot e multi-contas detectou um comportamento estranho. Ações foram restritas.",
  "statements.blacklist.two":
    "Por favor, envie um ticket com detalhes e nós responderemos.",
  "statements.clickBottle":
    "Clique em uma garrafa para adicioná-la à sua escolha.",
  "statements.clock.one":
    "Oh oh, parece que seu relógio não está sincronizado com o jogo. Configure a data e a hora para automático para evitar interrupções.",
  "statements.clock.two":
    "Precisa de ajuda para sincronizar seu relógio? Consulte nosso guia!",
  "statements.conversation.one": "Eu tenho algo para você!",
  "statements.cooldown":
    "Para proteger a comunidade, impomos um período de espera de 2 semanas antes que esta fazenda possa ser acessada.",
  "statements.docs": "Acesse a documentação",
  "statements.dontRefresh": "Não atualize seu navegador!",
  "statements.guide.one": "Consulte o guia",
  "statements.guide.two": "Consulte este guia para ajudá-lo a começar.",
  "statements.jigger.one":
    "Você será redirecionado para um serviço de terceiros para tirar uma selfie rápida. Nunca compartilhe informações pessoais ou dados criptográficos.",
  "statements.jigger.two":
    "Você falhou no teste de prova de humanidade do Jigger.",
  "statements.jigger.three":
    "Você pode continuar jogando, mas algumas ações serão restritas enquanto você estiver verificado.",
  "statements.jigger.four":
    "Por favor, entre em contato com support@usejigger.com se você acha que foi um erro.",
  "statements.jigger.five":
    "Sua prova de humanidade ainda está sendo processada pelo Jigger. Isso pode levar até 2 horas.",
  "statements.jigger.six":
    "O sistema de detecção multi-contas detectou um comportamento estranho.",
  "statements.jigger.seven":
    "Você pode continuar jogando, mas algumas ações serão restritas enquanto você estiver verificado.",
  "statements.lvlUp": "Alimente seu Bumpkin para subir de nível.",
  "statements.maintenance":
    "Coisas novas estão chegando! Obrigado pela sua paciência, o jogo estará de volta em breve.",
  "statements.make.a.wish": "Faça um novo desejo e veja o quão sortudo você é!",
  "statements.minted": "Os duendes criaram o seu ",
  "statements.minting":
    "Por favor, aguarde enquanto seu item é mintado na blockchain.",
  "statements.mutant.chicken":
    "Parabéns, seu frango botou um frango mutante muito raro!",
  "statements.new.wish":
    "Um novo desejo foi feito para você com base no seu saldo atual em fichas LP!",
  "statements.no.reward":
    "Você não tem nenhuma recompensa disponível! A liquidez deve ser mantida por 3 dias para receber uma recompensa!",
  "statements.ohNo": "Oh não! Algo deu errado!",
  "statements.openGuide": "Abrir o guia",
  "statements.patience": "Obrigado pela sua paciência.",
  "statements.sfl.rewards.received": "Recompensas SFL recebidas: ",
  "statements.sflLim.one": "Você atingiu o limite diário de SFL.",
  "statements.sflLim.two":
    "Você pode continuar jogando, mas terá que esperar até amanhã para sincronizar novamente.",
  "statements.sniped":
    "Oh não! Outro jogador comprou este trade antes de você.",
  "statements.switchNetwork": "Adicione ou mude de rede",
  "statements.sync":
    "Por favor, seja paciente enquanto sincronizamos todos os seus dados na blockchain.",
  "statements.tapCont": "Toque para continuar",
  "statements.thankYou": "Obrigado!",
  "statements.tutorial.one":
    "O barco o levará entre as ilhas onde você poderá descobrir novas terras e aventuras emocionantes.",
  "statements.tutorial.two":
    "Muitas terras são distantes e requerem um Bumpkin experiente antes que você possa visitá-las.",
  "statements.tutorial.three":
    "Sua aventura começa agora, até onde você explorará... depende de você.",
  "statements.visit.firePit":
    "Visite o Fire Pit para cozinhar comida e alimentar seu Bumpkin.",
  "statements.wish.granted.time": "É hora de conceder seu desejo!",
  "statements.wish.granted": "Seu desejo foi concedido.",
  "statements.wish.made": "Você fez um desejo!",
  "statements.wish.ready.in": "Tempo até o próximo desejo: ",
  "statements.wish.thanks": "Obrigado por apoiar o projeto e fazer um desejo.",
  "statements.wish.time":
    "Volte dentro do próximo período de tempo para ver o quão sortudo você é: ",
  "statements.wish.warning.one":
    "Esteja ciente de que apenas as fichas LP que você detinha no momento em que o desejo foi feito serão consideradas quando o desejo for concedido.",
  "statements.wish.warning.two":
    "Se você retirar sua liquidez durante este período, você não receberá nenhuma recompensa.",
  "statements.wishing-well.info.one":
    "O poço dos desejos é um lugar mágico onde recompensas SFL podem ser obtidas fazendo um desejo!",
  "statements.wishing-well.info.two":
    "Os desejos são concedidos aos agricultores que forneceram liquidez no jogo. Mais informações:",
  "statements.wishing-well.info.three":
    "Parece que você tem essas fichas LP mágicas em sua carteira!",
  "statements.wishing-well.info.four": "fornecer liquidez",
  "statements.wishing-well.not.providing.liquidity":
    "Parece que você ainda não está fornecendo liquidez. Mais informações:",
  "statements.wishing-well.info.five": " no jogo",
  "statements.wishing-well.info.six": "fornecendo liquidez",
  "statements.wishing.well.amount": "Quantidade de recompensas no poço: ",
  "statements.wishing.well.luck": "Vamos ver o quão sortudo você é!",
  "statements.wrongChain.one":
    "Consulte este guia para ajudá-lo a se conectar.",
  "statements.feed.bumpkin.one": "Você não tem comida em seu inventário.",
  "statements.feed.bumpkin.two":
    "Você precisará cozinhar comida para alimentar seu Bumpkin.",
  "statements.empty.chest": "Seu baú está vazio, descubra itens raros hoje!",
  "statements.chest.captcha": "Toque no baú para abri-lo",
  "statements.gold.pass.required":
    "Um Passe Gold é necessário para mintar NFTs raros.",
  "statements.frankie.plaza": "Vá até a praça para criar decorações raras!",
  "statements.blacksmith.plaza": "Vá até a praça para mais itens raros.",
  "statements.water.well.needed.one": "É necessário um poço de água adicional.",
  "statements.water.well.needed.two":
    "Para suportar mais culturas, construa um poço.",
  "statements.soldOut": "Esgotado",
  "statements.inStock": "Em estoque",
  "statements.soldOutWearables": "Ver acessórios esgotados",
  "statements.craft.composter": "Craftar no composter",
  "statements.wallet.to.inventory.transfer": "Transfira itens da sua carteira",
  "statements.crop.water": "Essas culturas precisam de água!",
  "statements.daily.limit": "Limite diário:",
  "statements.sure.buy": "Você tem certeza de que deseja comprar ",
};

const stopGoblin: Record<StopGoblin, string> = {
  "stopGoblin.stop.goblin": "Pare os Goblins!",
  "stopGoblin.stop.moon": "Pare os Caçadores da Lua!",
  "stopGoblin.tap.one":
    "Toque nos Caçadores da Lua antes que eles roubem seus recursos",
  "stopGoblin.tap.two": "Toque nos Goblins antes que eles comam sua comida",
  "stopGoblin.left": "Tentativas restantes",
};

const subSettings: Record<SubSettings, string> = {
  "subSettings.title": "Configurações",
  "subSettings.disableAnimations": "Desativar animações",
  "subSettings.enableAnimations": "Ativar animações",
  "subSettings.logout": "Sair",
  "subSettings.transferOwnership": "Transferir propriedade",
  "subSettings.refresh": "Atualizar",
  "subSettings.refreshDescription":
    "Atualize sua sessão para obter as últimas mudanças na Blockchain. Isso é útil se você depositou itens em sua fazenda.",
};

const swarming: Record<Swarming, string> = {
  "swarming.tooLongToFarm":
    "Cuidado, você demorou muito para cultivar suas colheitas!",
  "swarming.goblinsTakenOver":
    "Os goblins tomaram o controle de sua fazenda. Você deve esperar que eles saiam",
};

const tieBreaker: Record<TieBreaker, string> = {
  "tieBreaker.label": "Desempate",
  "tieBreaker.tiebreaker": "Desempate",
  "tieBreaker.closeBid":
    "Tão perto! Você apostou exatamente os mesmos recursos que o {{supply}} apostou. O vencedor é escolhido com base no Bumpkin com mais experiência. Infelizmente, você perdeu.",
  "tieBreaker.betterLuck":
    "É hora de comer mais bolos! Boa sorte na próxima vez.",
  "tieBreaker.readMore": "Saiba mais",
  "tieBreaker.refundResources": "Reembolsar recursos",
  "tieBreaker.refund": "Reembolso de recursos",
};

const toolDescriptions: Record<ToolDescriptions, string> = {
  // Tools
  "description.axe": "Usado para coletar madeira",
  "description.pickaxe": "Usado para coletar pedra",
  "description.stone.pickaxe": "Usado para coletar ferro",
  "description.iron.pickaxe": "Usado para coletar ouro",
  "description.hammer": "Em breve disponível",
  "description.rod": "Usado para pescar",
  "description.rusty.shovel":
    "Usado para remover edifícios e itens colecionáveis",
  "description.shovel": "Plante e colha culturas.",
  "description.sand.shovel": "Usado para escavar tesouros",
  "description.sand.drill":
    "Perfure profundamente para encontrar tesouros incomuns ou raros",
  "description.gold.pickaxe": "Usado para coletar rubis",
};

const transactionTerms: Record<TransactionTerms, string> = {
  "transaction.t&c.one":
    "Aceite os termos e condições para se conectar à Sunflower Land.",
  "transaction.t&c.two": "Aceitar os termos e condições",
  "transaction.mintFarm.one": "Sua fazenda foi criada!",
  "transaction.mintFarm.two": "Sua fazenda estará pronta em",
  "transaction.doNotRefresh": "Não atualize esta página",
  "transaction.network":
    "Para garantir a segurança de seus NFTs na blockchain, taxas de rede são necessárias.",
  "transaction.estimated.fee": "Taxa estimada:",
  "transaction.payCardCash": "Pague com cartão ou dinheiro",
  "transaction.creditCard": "*Taxas de cartão de crédito se aplicam",
  "transaction.rejected": "Transação rejeitada!",
  "transaction.message0":
    "Você precisa aceitar a transação na janela pop-up do Metamask para continuar.",
  "transaction.message":
    "Este pedido não desencadeará uma transação na blockchain nem gerará taxas de gás.",
  "transaction.maticAmount": "Quantidade em MATIC",
  "transaction.donate": "Faça uma doação",
  "transaction.donating": "Doação em andamento",
  "transaction.thankYou":
    "Obrigado pelo seu apoio! Por favor, escolha o jogo para o qual deseja fazer uma doação.",
  "transaction.minblockbucks": "Mínimo de 5 Block Bucks",
  "transaction.payCash": "Pague em dinheiro",
  "transaction.matic": "Matic",
  "transaction.payMatic": "Pague com Matic",
  "transaction.blockBucksFarm": "Block Bucks serão armazenados em sua fazenda.",
  "transaction.excludeFees": "*Preços não incluem taxas de transação.",
  "transaction.blockchain.one": "Deseja armazenar seu progresso na blockchain?",
  "transaction.blockchain.two":
    "O armazenamento de dados na blockchain não reabastece as lojas.",
  "transaction.progress": "Armazenar o progresso",
  "transaction.progChain": "Armazenar o progresso na cadeia",
  "transaction.success": "Uhu! Seus objetos estão seguros na blockchain!",
  "transaction.congrats": "Parabéns, sua transação foi bem-sucedida",
  "transaction.transacting.one": "Processando sua transação.",
  "transaction.transacting.two":
    "Aguarde a confirmação de sua transação na blockchain.",
  "transaction.transacting.three":
    "Após 5 minutos, todas as transações não confirmadas serão redefinidas.",
  "transaction.withdraw.one": "Retirando",
  "transaction.withdraw.two": "Seus objetos/tokens foram enviados para:",
  "transaction.withdraw.three": "Você pode ver seus objetos em",
  "transaction.openSea": "OpenSea",
  "transaction.withdraw.four":
    "Você pode ver seus tokens importando o Token SFL para sua carteira.",
  "transaction.withdraw.five": "Importar o Token SFL para o MetaMask",
  "transaction.withdraw.six":
    "Observe que o OpenSea pode levar até 30 minutos para exibir seus objetos. Você também pode ver seus objetos em",
  "transaction.withdraw.polygon": "PolygonScan",
  "transaction.id": "ID da transação",
};

const transfer: Record<Transfer, string> = {
  "transfer.sure.adress":
    "Certifique-se de que o endereço fornecido está na Blockchain Polygon, está correto e pertence a você. Não há recuperação para endereços incorretos.",
  "transfer.Account": "Sua conta #",
  "transfer.Account.Trans": "foi transferida para:",
  "transfer.Farm": "Transferência de sua fazenda!",
  "transfer.Refresh": "Não atualize este navegador",
  "transfer.Taccount": "Transfira sua conta",
  "transfer.address": "Endereço da carteira:",
};

const transferAccount: Record<TransferAccount, string> = {
  "transferAccount.transferYourAccount": "Transfira sua conta",
  "transferAccount.walletAddress": "Endereço da carteira:",
  "transferAccount.warning":
    "Certifique-se de que o endereço que você forneceu está na Blockchain Polygon, está correto e pertence a você. Não há recuperação para endereços incorretos.",
  "transferAccount.transfer": "Transferir",
  "transferAccount.readMore": "Saiba mais",
  "transferAccount.transferringFarm": "Transferência de sua fazenda!",
  "transferAccount.doNotRefresh": "Não atualize este navegador",
  "transferAccount.successMessage":
    "Sua conta #{{farmId}} foi transferida para: {{address}}",
  "transferAccount.continue": "Continuar",
};

const treasureModal: Record<TreasureModal, string> = {
  "treasureModal.noShovelTitle": "Sem Pá de Areia!",
  "treasureModal.needShovel":
    "Você precisa ter uma pá de areia equipada para poder cavar em busca de tesouros!",
  "treasureModal.purchaseShovel":
    "Se você precisa comprar uma, vá até a loja de tesouros na extremidade sul da ilha.",
  "treasureModal.gotIt": "Entendi",
  "treasureModal.maxHolesTitle": "Número máximo de buracos atingido!",
  "treasureModal.saveTreasure": "Guarde um pouco de tesouro para os outros!",
  "treasureModal.comeBackTomorrow": "Volte amanhã para procurar mais tesouros.",
  "treasureModal.drilling": "Perfuração",
};

const tutorialPage: Record<TutorialPage, string> = {
  "tutorial.pageOne.text1":
    "Este menu mostrará os níveis necessários para desbloquear novos edifícios.",
  "tutorial.pageOne.text2":
    "Alguns deles podem ser construídos várias vezes uma vez que você atinge um certo nível.",
  "tutorial.pageTwo.text1":
    "Os edifícios são uma parte importante do progresso no jogo, pois ajudarão você a se expandir e evoluir.",
  "tutorial.pageTwo.text2":
    "Vamos começar melhorando nosso Bumpkin para que possamos obter a bancada de trabalho e aprender mais sobre as ferramentas.",
};

const visitislandEnter: Record<VisitislandEnter, string> = {
  "visitIsland.enterIslandId": "Digite o ID da ilha: ",
  "visitIsland.visit": "Visitar",
};

const visitislandNotFound: Record<VisitislandNotFound, string> = {
  "visitislandNotFound.title": "Ilha Não Encontrada!",
};

const warningTerms: Record<WarningTerms, string> = {
  "warning.noAxe": "Nenhuma machadinha selecionada!",
  "warning.chat.maxCharacters": "Máximo de caracteres:",
  "warning.chat.noSpecialCharacters": "Sem caracteres especiais",
  "warning.level.required": "Nível necessário:",
  "warning.hoarding.message":
    "Você atingiu o limite de armazenamento para o seguinte item:",
  "warning.hoarding.one":
    "Dizem que os Goblins são conhecidos por atacar fazendas repletas de recursos.",
  "warning.hoarding.two":
    "Para se proteger e proteger esses recursos preciosos, por favor, sincronize-os na cadeia antes de colher mais:",
  "travelRequirement.notice": "Antes de viajar, você deve subir de nível.",
};

const welcomeTerms: Record<WelcomeTerms, string> = {
  "welcome.createAccount": "Criar uma conta",
  "welcome.creatingAccount": "Criando sua conta",
  "welcome.email": "Email & Conexão social",
  "welcome.login": "Conexão",
  "welcome.needHelp": "Precisa de ajuda?",
  "welcome.otherWallets": "Outras carteiras",
  "welcome.signingIn": "Entrando",
  "welcome.signInMessage":
    "Aceite a solicitação de assinatura em sua carteira de navegador para fazer login.",
  "welcome.takeover":
    "Parece que você é novo na Terra da Flor de Girassol e reivindicou a propriedade da conta de outro jogador.",
  "welcome.promo": "Adicionar um código promocional",
};

const winner: Record<Winner, string> = {
  "winner.congratulations": "Parabéns!",
  "winner.mintTime": "Você tem 24 horas para resgatar seu prêmio.",
  "winner.mint": "Resgatar",
  "winner.mintTime.one": "Nenhum item disponível para criar!",
};

const withdraw: Record<Withdraw, string> = {
  "withdraw.proof":
    "Prova de humanidade é necessária para este recurso. Por favor, tire uma selfie rápida.",
  "withdraw.verification": "Iniciar Verificação",
  "withdraw.unsave": "Qualquer progresso não salvo será perdido.",
  "withdraw.sync":
    "Você só pode retirar itens que sincronizou com o blockchain.",
  "withdraw.available": "Disponível em 9 de maio",
  "withdraw.sfl.available": "SFL está disponível na cadeia",
  "withdraw.max": "Máximo",
  "withdraw.fee": "taxa",
  "withdraw.send.wallet": "Enviado para sua carteira",
  "withdraw.choose": "Escolha o valor a ser retirado",
  "withdraw.receive": "Você receberá:",
  "withdraw.select.item": "Selecione itens para retirar",
  "withdraw.select": "Selecionado",
  "withdraw.opensea":
    "Uma vez retirado, você poderá ver seus itens no OpenSea.",
  "withdraw.restricted":
    "Alguns itens não podem ser retirados. Outros itens podem ser restritos quando ",
  "withdraw.bumpkin.wearing":
    "Seu Bumpkin está atualmente usando os seguintes itens que não podem ser retirados. Você precisará desequipá-los antes de poder retirá-los.",
  "withdraw.bumpkin.sure.withdraw":
    "Tem certeza de que deseja retirar seu Bumpkin?",
  "withdraw.bumpkin.play":
    "Para jogar o jogo, você sempre precisa de um Bumpkin na sua fazenda.",
  "withdraw.buds": "Selecione Buds para retirar",
};

const world: Record<World, string> = {
  "world.intro.one": "Olá, viajante! Bem-vindo à Praça da Abóbora.",
  "world.intro.two":
    "A praça é o lar de uma diversificada comunidade de Bumpkins e Goblins famintos que precisam da sua ajuda!",
  "world.intro.three": "Algumas dicas rápidas antes de começar sua aventura:",
  "world.intro.visit":
    "Visite os NPCs e complete entregas para ganhar SFL e recompensas raras.",
  "world.intro.craft":
    "Craft itens colecionáveis raros, roupas e decorações nas diferentes lojas.",
  "world.intro.carf.limited":
    "Corra, os itens estão disponíveis por tempo limitado!",
  "world.intro.trade":
    "Negocie recursos com outros jogadores. Para interagir com um jogador, se aproxime e clique nele.",
  "world.intro.auction":
    "Prepare seus recursos e visite a Casa de Leilões para competir com outros jogadores por itens colecionáveis raros!",
  "world.intro.four": "Para mover seu Bumpkin, use as setas do teclado.",
  "world.intro.five": "Em telas sensíveis ao toque, use o joystick.",
  "world.intro.six":
    "Para interagir com um Bumpkin ou objeto, se aproxime e clique nele.",
  "world.intro.seven":
    "Sem assédio, palavrões ou intimidação. Por favor, respeite os outros.",
};

const wornDescription: Record<WornDescription, string> = {
  "worm.earthworm": "Uma minhoca rastejante que atrai peixes pequenos.",
  "worm.grub": "Uma larva suculenta - perfeita para peixes avançados.",
  "worm.redWiggler": "Uma minhoca exótica que atrai peixes raros.",
};

export const PORTUGUESE_TERMS: Record<TranslationKeys, string> = {
  ...achievementTerms,
  ...action,
  ...addSFL,
  ...availableSeeds,
  ...base,
  ...beach,
  ...beachLuck,
  ...birdiePlaza,
  ...boostDescriptions,
  ...boostEffectDescriptions,
  ...bountyDescription,
  ...buildingDescriptions,
  ...bumpkinItemBuff,
  ...bumpkinPartRequirements,
  ...bumpkinSkillsDescription,
  ...bumpkinTrade,
  ...buyFarmHand,
  ...claimAchievement,
  ...chat,
  ...chickenWinner,
  ...choresStart,
  ...chumDetails,
  ...community,
  ...compostDescription,
  ...composterDescription,
  ...confirmSkill,
  ...confirmationTerms,
  ...conversations,
  ...cropFruitDescriptions,
  ...deliveryitem,
  ...defaultDialogue,
  ...decorationDescriptions,
  ...delivery,
  ...deliveryHelp,
  ...depositWallet,
  ...detail,
  ...discordBonus,
  ...donation,
  ...errorAndAccess,
  ...errorTerms,
  ...exoticShopItems,
  ...festivetree,
  ...fishDescriptions,
  ...fishermanModal,
  ...fishermanQuest,
  ...fishingChallengeIntro,
  ...fishingGuide,
  ...fishingQuests,
  ...flowerbedguide,
  ...foodDescriptions,
  ...garbageCollector,
  ...gameDescriptions,
  ...gameTerms,
  ...generalTerms,
  ...getContent,
  ...getInputErrorMessage,
  ...goblin_messages,
  ...goldTooth,
  ...goldpassModal,
  ...guideTerms,
  ...grubshop,
  ...halveningCountdown,
  ...harvestflower,
  ...harvestBeeHive,
  ...hayseedHankPlaza,
  ...hayseedHankV2,
  ...heliosSunflower,
  ...henHouseTerms,
  ...howToFarm,
  ...howToSync,
  ...howToUpgrade,
  ...islandupgrade,
  ...interactableModals,
  ...introPage,
  ...introTerms,
  ...islandName,
  ...islandNotFound,
  ...kick,
  ...kicked,
  ...landscapeTerms,
  ...letsGo,
  ...levelUpMessages,
  ...loser,
  ...lostSunflorian,
  ...modalDescription,
  ...mute,
  ...noBumpkin,
  ...noTownCenter,
  ...notOnDiscordServer,
  ...npc,
  ...npcDialogues,
  ...npc_message,
  ...nyeButton,
  ...obsessionDialogue,
  ...offer,
  ...onCollectReward,
  ...onboarding,
  ...orderhelp,
  ...parsnip,
  ...pending,
  ...personHood,
  ...pirateQuest,
  ...pickserver,
  ...plazaSettings,
  ...playerTrade,
  ...portal,
  ...purchaseableBaitTranslation,
  ...quest,
  ...questions,
  ...reaction,
  ...refunded,
  ...removeKuebiko,
  ...resale,
  ...restock,
  ...retreatTerms,
  ...rewardTerms,
  ...rulesGameStart,
  ...rulesTerms,
  ...sceneDialogueKey,
  ...seasonTerms,
  ...session,
  ...settingsMenu,
  ...share,
  ...sharkBumpkinDialogues,
  ...shelly,
  ...shellyDialogue,
  ...shopItems,
  ...showingFarm,
  ...snorklerDialogues,
  ...statements,
  ...stopGoblin,
  ...subSettings,
  ...swarming,
  ...tieBreaker,
  ...toolDescriptions,
  ...transactionTerms,
  ...transfer,
  ...transferAccount,
  ...treasureModal,
  ...tutorialPage,
  ...visitislandEnter,
  ...visitislandNotFound,
  ...warningTerms,
  ...welcomeTerms,
  ...winner,
  ...withdraw,
  ...world,
  ...wornDescription,
};
