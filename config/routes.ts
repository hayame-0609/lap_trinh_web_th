export default [
	{
		path: '/user',
		layout: false,
		routes: [
			{
				path: '/user/login',
				layout: false,
				name: 'login',
				component: './user/Login',
			},
			{
				path: '/user',
				redirect: '/user/login',
			},
		],
	},

	///////////////////////////////////
	// DEFAULT MENU
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: './TrangChu',
		icon: 'HomeOutlined',
	},
	{
		path: '/gioi-thieu',
		name: 'About',
		component: './TienIch/GioiThieu',
		hideInMenu: true,
	},
	{
		path: '/random-user',
		name: 'RandomUser',
		component: './RandomUser',
		icon: 'ArrowsAltOutlined',
	},
	{
		path: '/todo-list',
		name: 'TodoList',
		icon: 'OrderedListOutlined',
		component: './TodoList',
	},
{
  path: '/minigame',
  name: 'minigame',
  component: './minigame/minigame',
},
{
  path: '/study',
  name: 'QuanLyHocTap',
  component: './quan_ly_hoc_tap/quan_ly_hoc_tap',
},
		{
		path: '/keo_bua_bao',
		name: 'KeoBuaBao',
		component: './bai_th_02/bai_01',
	},
	{
  path: '/bai-02',
  name: 'Bài TH 02',
  routes: [
    {
      path: '/bai-02/khoi-kien-thuc',
      name: 'Khối kiến thức',
      component: './bai_th_02/bai_02/khoi_kien_thuc',
    },
    {
      path: '/bai-02/mon-hoc',
      name: 'Môn học',
      component: './bai_th_02/bai_02/mon_hoc',
    },
    {
      path: '/bai-02/cau-hoi',
      name: 'Câu hỏi',
      component: './bai_th_02/bai_02/cau_hoi',
    },
    {
      path: '/bai-02/de-thi',
      name: 'Tạo đề thi',
      component: './bai_th_02/bai_02/de_thi',
    },
  ],
},
	// DANH MUC HE THONG
	// {
	// 	name: 'DanhMuc',
	// 	path: '/danh-muc',
	// 	icon: 'copy',
	// 	routes: [
	// 		{
	// 			name: 'ChucVu',
	// 			path: 'chuc-vu',
	// 			component: './DanhMuc/ChucVu',
	// 		},
	// 	],
	// },

	{
		path: '/notification',
		routes: [
			{
				path: './subscribe',
				exact: true,
				component: './ThongBao/Subscribe',
			},
			{
				path: './check',
				exact: true,
				component: './ThongBao/Check',
			},
			{
				path: './',
				exact: true,
				component: './ThongBao/NotifOneSignal',
			},
		],
		layout: false,
		hideInMenu: true,
	},
	{
		path: '/',
	},
	{
		path: '/403',
		component: './exception/403/403Page',
		layout: false,
	},
	{
		path: '/hold-on',
		component: './exception/DangCapNhat',
		layout: false,
	},
	{
		component: './exception/404',
	},
];
