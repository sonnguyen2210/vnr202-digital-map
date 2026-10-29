import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './digital_map.css';
import themeSong from './Thịnh Vượng Việt Nam Sáng Ngời.mp3';

// 1. TẬP DỮ LIỆU ĐƯỢC CHUẨN HÓA TỪ VĂN KIỆN ĐẢNG & GIÁO TRÌNH LỊCH SỬ ĐẢNG
const historicalEvents = [
  {
    id: 'bac-son',
    title: 'Khởi nghĩa Bắc Sơn & Sự chuyển hướng chỉ đạo của Đảng',
    date: '27/09/1940',
    category: 'Chủ trương & Khởi nghĩa vũ trang',
    coords: [21.9038, 106.3262],
    videoEmbed: 'https://www.youtube-nocookie.com/embed/nkuDKjhNTy0',
    videoSource: 'Đài Phát thanh & Truyền hình Lạng Sơn',
    highlight: 'Sự nhạy bén của Xứ ủy Bắc Kỳ trong việc kịp thời phối hợp, bước đầu chuyển hướng từ đấu tranh chính trị sang khởi nghĩa tự vệ.',
    stats: [
      { label: 'Cơ quan chỉ đạo', val: 'Xứ ủy Bắc Kỳ' },
      { label: 'Lực lượng nòng cốt', val: 'Đội du kích Bắc Sơn (20 chiến sĩ)' }
    ],
    figures: ['Hoàng Văn Hán', 'Chu Văn Tấn', 'Trần Đăng Ninh'],
    timelineSteps: [
      { time: '27/09/1940', text: 'Nhân dân dưới sự lãnh đạo của chi bộ Đảng chớp thời cơ Pháp - Nhật giao tranh, tước vũ khí địch, đánh chiếm đồn Mỏ Nhài.' },
      { time: '16/10/1940', text: 'Xứ ủy Bắc Kỳ kịp thời cử cán bộ (Trần Đăng Ninh) lên phối hợp với Chu Văn Tấn, quyết định thành lập Đội du kích Bắc Sơn.' },
      { time: '28/10/1940', text: 'Đảng rút ra bài học thực tiễn về việc bảo toàn lực lượng khi so sánh lực lượng chưa có lợi cho cách mạng.' }
    ],
    significance: 'Đánh dấu bước chuyển hướng chỉ đạo quan trọng của Đảng: bước đầu kết hợp đấu tranh chính trị với vũ trang tự vệ, đặt nền móng cho việc xây dựng lực lượng vũ trang tập trung.'
  },
  {
    id: 'nam-ky',
    title: 'Khởi nghĩa Nam Kỳ & Bài học kinh nghiệm về đánh giá thời cơ',
    date: '23/11/1940',
    category: 'Đường lối & Phong trào cách mạng',
    coords: [10.8856, 106.5946],
    videoEmbed: 'https://www.youtube-nocookie.com/embed/cbdFNXkPiLk',
    videoSource: 'Truyền hình Nhân Dân (Báo Nhân Dân)',
    highlight: 'Để lại bài học xương máu quý báu cho Đảng về nghệ thuật đánh giá thời cơ, chuẩn bị lực lượng và sự thống nhất ý chí trong tổ chức.',
    stats: [
      { label: 'Quy mô nổi dậy', val: '18/21 tỉnh Nam Bộ' },
      { label: 'Bài học rút ra', val: 'Thời cơ và sự chuẩn bị lực lượng' }
    ],
    figures: ['Phan Đăng Lưu', 'Tạ Uyên', 'Nguyễn Thị Minh Khai', 'Nguyễn Thị Bảy'],
    timelineSteps: [
      { time: '11/1940', text: 'Xứ ủy Nam Kỳ quyết định phát động khởi nghĩa dù Trung ương Đảng đã nhận định điều kiện chưa chín muồi và xin tạm hoãn.' },
      { time: 'Đêm 22 - 23/11/1940', text: 'Cuộc nổi dậy diễn ra quy mô lớn tại 18 tỉnh Nam Bộ, thể hiện tinh thần kiên trung tuyệt đối của quần chúng với Đảng.' },
      { time: '12/1940', text: 'Đảng tổng kết bài học kinh nghiệm sâu sắc về chỉ đạo chiến lược, sự thống nhất tuyệt đối từ Trung ương đến địa phương.' }
    ],
    significance: 'Cung cấp cho Đảng bài học kinh nghiệm xương máu về chỉ đạo khởi nghĩa: phải đúng thời điểm, khi lực lượng đã được chuẩn bị đầy đủ và thời cơ cách mạng đã chín muồi.'
  },
  {
    id: 'do-luong',
    title: 'Binh biến Đô Lương & Công tác vận động binh lính của Đảng',
    date: '13/01/1941',
    category: 'Công tác binh vận của Đảng',
    coords: [18.9167, 105.3000],
    videoEmbed: 'https://www.youtube-nocookie.com/embed/tWLqY8ZT2NA',
    videoSource: 'Truyền hình Nhân Dân (Báo Nhân Dân)',
    highlight: 'Minh chứng sinh động cho hiệu quả của công tác vận động binh lính (binh vận) – một mặt trận quan trọng trong chiến lược của Đảng.',
    stats: [
      { label: 'Mặt trận công tác', val: 'Công tác Binh vận' },
      { label: 'Lãnh đạo chủ chốt', val: 'Đội Cung (Nguyễn Văn Cung)' }
    ],
    figures: ['Đội Cung (Nguyễn Văn Cung)'],
    timelineSteps: [
      { time: '13/01/1941', text: 'Dưới ảnh hưởng của tổ chức Đảng, binh lính người Việt tại đồn Chợ Rạng nổi dậy chống lệnh điều đi làm bia đỡ đạn.' },
      { time: 'Đêm 13/01/1941', text: 'Cuộc binh biến đánh chiếm Đô Lương và hành quân về Vinh nhưng do chưa kết nối được với phong trào chung nên bị cô lập.' },
      { time: '24/04/1941', text: 'Các chiến sĩ binh biến kiên cường hy sinh, khẳng định tinh thần bất khuất trước kẻ thù.' }
    ],
    significance: 'Khẳng định tầm quan trọng của công tác binh vận trong đường lối cách mạng của Đảng, góp phần phân hóa và làm suy yếu hàng ngũ địch.'
  },
  {
    id: 'pac-bo',
    title: 'Hội nghị Trung ương 8 (05/1941): Hoàn chỉnh chuyển hướng chiến lược',
    date: '28/01/1941 – 19/05/1941',
    category: 'Chủ trương & Đường lối chiến lược',
    coords: [22.9818, 106.0506],
    videoEmbed: 'https://www.youtube-nocookie.com/embed/WKcXjaqJY04',
    videoSource: 'Đài Truyền hình Việt Nam (VTV3)',
    highlight: 'Đỉnh cao tư duy lý luận của Chủ tịch Hồ Chí Minh: Đặt nhiệm vụ giải phóng dân tộc lên hàng đầu, giải quyết đúng đắn vấn đề dân tộc và giai cấp.',
    stats: [
      { label: 'Văn kiện chủ đạo', val: 'Nghị quyết Hội nghị TW 8 (Khóa I)' },
      { label: 'Tổ chức mặt trận', val: 'Mặt trận Việt Minh (19/05/1941)' }
    ],
    figures: ['Lãnh tụ Hồ Chí Minh (Chủ trì)'],
    timelineSteps: [
      { time: '28/01/1941', text: 'Lãnh tụ Nguyễn Ái Quốc về nước, trực tiếp lãnh đạo phong trào cách mạng Việt Nam sau 30 năm bôn ba.' },
      { time: '10 – 19/05/1941', text: 'Chủ trì Hội nghị Trung ương 8 tại Pác Bó (Cao Bằng), quyết định tạm gác khẩu hiệu cách mạng ruộng đất, đặt nhiệm vụ giải phóng dân tộc lên trên hết.' },
      { time: '19/05/1941', text: 'Sáng lập Mặt trận Việt Minh nhằm đoàn kết rộng rãi mọi tầng lớp nhân dân không phân biệt tôn giáo, giai cấp.' }
    ],
    significance: 'Hoàn chỉnh sự chuyển hướng chiến lược được vạch ra từ Hội nghị TW 6 (1939), là văn kiện kim chỉ nam quyết định thắng lợi của Cách mạng Tháng Tám 1945.'
  },
  {
    id: 'tran-hung-dao',
    title: 'Thành lập Đội VNTTGPQ: Tư tưởng quân sự của Đảng',
    date: '22/12/1944',
    category: 'Xây dựng lực lượng vũ trang',
    coords: [22.6105, 105.8972],
    videoEmbed: 'https://www.youtube-nocookie.com/embed/T591PKbi3Jc',
    videoSource: 'QPVN - Truyền Hình Quốc Phòng Việt Nam',
    highlight: 'Thực hiện chỉ thị của Hồ Chí Minh: “Chính trị trọng hơn quân sự”, đặt cơ sở cho việc xây dựng lực lượng vũ trang chính quy.',
    stats: [
      { label: 'Chỉ thị lãnh đạo', val: 'Chỉ thị thành lập Đội VNTTGPQ' },
      { label: 'Nguyên tắc tổ chức', val: 'Đảng lãnh đạo tuyệt đối' }
    ],
    figures: ['Hồ Chí Minh', 'Võ Nguyên Giáp (Chỉ huy)', 'Hoàng Sâm (Đội trưởng)'],
    timelineSteps: [
      { time: '12/1944', text: 'Bác Hồ ra chỉ thị nhấn mạnh nguyên tắc chính trị trọng hơn quân sự, tuyên truyền trọng hơn tác chiến.' },
      { time: '22/12/1944', text: 'Thành lập Đội Việt Nam Tuyên truyền Giải phóng quân tại rừng Trần Hưng Đạo (Cao Bằng).' },
      { time: '25 – 26/12/1944', text: 'Giành thắng lợi vang dội tại Phai Khắt và Nà Ngần, khẳng định nghệ thuật quân sự tài tình của lực lượng chủ lực đầu tiên.' }
    ],
    significance: 'Thể hiện bước phát triển mới trong tư tưởng quân sự của Đảng: kết hợp chặt chẽ giữa đấu tranh chính trị và đấu tranh vũ trang, xây dựng lực lượng vũ trang 3 thứ quân.'
  },
  {
    id: 'hiep-hoa',
    title: 'Hội nghị Quân sự cách mạng Bắc Kỳ (04/1945)',
    date: '15/04/1945 – 20/04/1945',
    category: 'Chủ trương & Quân sự',
    coords: [21.3444, 105.9861],
    videoEmbed: 'https://www.youtube-nocookie.com/embed/g0ib84B6s0A',
    videoSource: 'Truyền hình Nhân Dân (Báo Nhân Dân)',
    highlight: 'Quyết định tầm nhìn chiến lược: Thống nhất lực lượng vũ trang toàn quốc, chuẩn bị trực tiếp cho Tổng khởi nghĩa.',
    stats: [
      { label: 'Cơ quan triệu tập', val: 'Ban Thường vụ Trung ương Đảng' },
      { label: 'Quyết định lớn', val: 'Thống nhất Việt Nam Giải phóng quân' }
    ],
    figures: ['Trường Chinh (Chủ trì)', 'Võ Nguyên Giáp', 'Trần Đăng Ninh'],
    timelineSteps: [
      { time: '15/04/1945', text: 'Ban Thường vụ Trung ương Đảng họp tại Hiệp Hòa (Bắc Giang), nhận định thời cơ khởi nghĩa đang đến gần.' },
      { time: '15/05/1945', text: 'Hợp nhất Việt Nam Tuyên truyền Giải phóng quân và Cứu quốc quân thành Việt Nam Giải phóng quân.' },
      { time: 'Tháng 5/1945', text: 'Thiết lập 7 chiến khu lớn làm căn cứ địa vững chắc cho cách mạng.' }
    ],
    significance: 'Đánh dấu bước nhảy vọt trong công tác chuẩn bị về quân sự của Đảng, đáp ứng yêu cầu cấp bách của tình thế cách mạng trước khi Nhật đầu hàng Đồng minh.'
  },
  {
    id: 'tan-trao',
    title: 'Quốc dân Đại hội Tân Trào & Quân lệnh số 1',
    date: '13/08/1945 – 16/08/1945',
    category: 'Nghệ thuật lãnh đạo Tổng khởi nghĩa',
    coords: [21.7589, 105.3789],
    videoEmbed: 'https://www.youtube-nocookie.com/embed/32tXt4Tfsm0',
    videoSource: 'Truyền hình Nhân Dân (Báo Nhân Dân)',
    highlight: 'Sự quyết đoán tối cao của Trung ương Đảng và Chủ tịch Hồ Chí Minh: Chớp thời cơ ngàn năm có một để phát động Tổng khởi nghĩa.',
    stats: [
      { label: 'Văn kiện ban bố', val: 'Quân lệnh số 1 (Ủy ban Khởi nghĩa)' },
      { label: 'Cơ quan lâm thời', val: 'Ủy ban Dân tộc Giải phóng' }
    ],
    figures: ['Hồ Chí Minh', 'Trường Chinh'],
    timelineSteps: [
      { time: '23h ngày 13/08/1945', text: 'Ngay khi nhận tin Nhật sắp đầu hàng, Đảng và Tổng bộ Việt Minh lập tức ban bố Quân lệnh số 1.' },
      { time: '16/08/1945', text: 'Đại hội Quốc dân Tân Trào thông qua 10 chính sách lớn của Việt Minh và bầu Chính phủ lâm thời.' },
      { time: 'Tháng 8/1945', text: 'Hồ Chí Minh ra lời kêu gọi Tổng khởi nghĩa: "Dù phải đốt cháy cả dãy Trường Sơn cũng phải kiên quyết giành cho được độc lập".' }
    ],
    significance: 'Thể hiện năng lực lãnh đạo xuất sắc, tầm nhìn chiến lược sắc bén và sự nhạy bén đặc biệt của Đảng trong việc đón đầu thời cơ.'
  },
  {
    id: 'ha-noi',
    title: 'Đảng bộ Hà Nội lãnh đạo khởi nghĩa giành chính quyền',
    date: '19/08/1945',
    category: 'Nghệ thuật chớp thời cơ',
    coords: [21.0245, 105.8575],
    videoEmbed: 'https://www.youtube-nocookie.com/embed/fCqgLY4QqeE',
    videoSource: 'Trung tâm Tin tức VTV24 (Đài THVN)',
    highlight: 'Mẫu mực về sự lãnh đạo linh hoạt, sáng tạo của Đảng bộ địa phương trong việc biến mít tinh của địch thành cuộc khởi nghĩa.',
    stats: [
      { label: 'Đảng bộ lãnh đạo', val: 'Thành ủy Hà Nội' },
      { label: 'Đặc điểm thắng lợi', val: 'Nhanh chóng, triệt để, ít đổ máu' }
    ],
    figures: ['Nguyễn Khang', 'Trần Tử Bình', 'Nguyễn Quyết'],
    timelineSteps: [
      { time: '17/08/1945', text: 'Đảng bộ Hà Nội khôn khéo lái cuộc mít tinh của Tổng hội Viên chức thân Nhật thành cuộc tuần hành biểu dương lực lượng.' },
      { time: 'Sáng 19/08/1945', text: 'Hàng chục vạn quần chúng dưới sự lãnh đạo của mặt trận Việt Minh tỏa đi chiếm các cơ quan đầu não của địch.' },
      { time: 'Chiều 19/08/1945', text: 'Khởi nghĩa tại Thủ đô thắng lợi hoàn toàn, tạo tiếng vang và hiệu ứng dây chuyền cho cả nước.' }
    ],
    significance: 'Minh chứng rõ nét cho phương thức lãnh đạo linh hoạt, chủ động, sáng tạo của các cấp ủy đảng và nghệ thuật kết hợp lực lượng chính trị với vũ trang.'
  },
  {
    id: 'hue',
    title: 'Khởi nghĩa tại Huế & Xóa bỏ chế độ phong kiến',
    date: '23/08/1945',
    category: 'Thắng lợi Tổng khởi nghĩa',
    coords: [16.4637, 107.5909],
    videoEmbed: 'https://www.youtube-nocookie.com/embed/m5u5Rc-QxX4',
    videoSource: 'VNAMEDIA - Trung tâm nội dung số',
    highlight: 'Đường lối ngoại giao và chính trị sắc bén của Đảng trong việc buộc chính quyền phong kiến đầu hàng không đổ máu, vua Bảo Đại thoái vị.',
    stats: [
      { label: 'Cơ quan chỉ đạo', val: 'Ủy ban Khởi nghĩa Trung Trung Bộ' },
      { label: 'Sự kiện mang tính biểu tượng', val: 'Vua Bảo Đại thoái vị (30/08)' }
    ],
    figures: ['Tố Hữu', 'Hồ Tùng Mậu', 'Trần Huy Liệu', 'Vua Bảo Đại'],
    timelineSteps: [
      { time: '20 – 22/08/1945', text: 'Tố Hữu và Xứ ủy Trung Kỳ khẩn trương chuẩn bị lực lượng, gây sức ép chính trị mạnh mẽ lên triều đình Huế.' },
      { time: '23/08/1945', text: 'Nhân dân Huế khởi nghĩa giành chính quyền thành công, lập Ủy ban Nhân dân Cách mạng lâm thời.' },
      { time: '30/08/1945', text: 'Đảng và Chính phủ tiếp nhận ấn kiếm, chính thức chấm dứt triều đại phong kiến cuối cùng.' }
    ],
    significance: 'Thể hiện thành công nghệ thuật vận động, thuyết phục và phân hóa kẻ thù của Đảng, giải quyết triệt để vấn đề chính quyền.'
  },
  {
    id: 'sai-gon',
    title: 'Khởi nghĩa tại Sài Gòn & Hoàn thành thắng lợi Nam Bộ',
    date: '25/08/1945',
    category: 'Thắng lợi Tổng khởi nghĩa',
    coords: [10.7769, 106.7009],
    videoEmbed: 'https://www.youtube-nocookie.com/embed/FOMRPr1TXHk',
    videoSource: 'Truyền hình Nhân Dân (Báo Nhân Dân)',
    highlight: 'Đảng bộ Nam Bộ lãnh đạo quần chúng vùng lên đập tan sào huyệt cuối cùng của thực dân, hoàn thành trọn vẹn Tổng khởi nghĩa từ Bắc chí Nam.',
    stats: [
      { label: 'Lãnh đạo trực tiếp', val: 'Xứ ủy Nam Bộ & Trần Văn Giàu' },
      { label: 'Lực lượng tham gia', val: 'Hơn 1 triệu quần chúng' }
    ],
    figures: ['Trần Văn Giàu'],
    timelineSteps: [
      { time: 'Tối 24/08/1945', text: 'Xứ ủy Nam Bộ quyết định phát động khởi nghĩa chiếm các mục tiêu chiến lược tại Sài Gòn.' },
      { time: 'Sáng 25/08/1945', text: 'Hơn một triệu đồng bào Sài Gòn - Chợ Lớn rầm rộ xuống đường biểu tình, làm tê liệt toàn bộ hệ thống cai trị của địch.' },
      { time: '13h ngày 25/08/1945', text: 'Tuyên bố thành lập chính quyền cách mạng lâm thời Nam Bộ trước hàng vạn quần chúng.' }
    ],
    significance: 'Khẳng định sự lãnh đạo kiên cường, sáng tạo của Đảng bộ Nam Bộ, đưa cuộc Tổng khởi nghĩa 1945 đi đến thắng lợi toàn diện trên phạm vi cả nước.'
  },
  {
    id: 'ba-dinh',
    title: 'Khai sinh nước Việt Nam Dân chủ Cộng hòa',
    date: '02/09/1945',
    category: 'Thắng lợi & Hoạch định quốc gia',
    coords: [21.0378, 105.8344],
    videoEmbed: 'https://www.youtube-nocookie.com/embed/jHmz5FgYpYo',
    videoSource: 'Đài Truyền hình Việt Nam (VTV)',
    highlight: 'Thành quả vĩ đại nhất dưới sự lãnh đạo của Đảng: Đưa dân tộc Việt Nam bước vào kỷ nguyên độc lập, tự do, Đảng trở thành đảng cầm quyền.',
    stats: [
      { label: 'Tác giả văn kiện', val: 'Chủ tịch Hồ Chí Minh' },
      { label: 'Nhà nước ra đời', val: 'VNDCCH (Nhà nước công nông đầu tiên ĐNA)' }
    ],
    figures: ['Chủ tịch Hồ Chí Minh', 'Các đồng chí trong Chính phủ lâm thời'],
    timelineSteps: [
      { time: '28 – 31/08/1945', text: 'Chủ tịch Hồ Chí Minh soạn thảo bản Tuyên ngôn Độc lập, đúc kết ý chí và khát vọng của toàn Đảng, toàn dân.' },
      { time: '14h ngày 02/09/1945', text: 'Tại Quảng trường Ba Đình lịch sử, Người đọc Tuyên ngôn Độc lập, khai sinh nước Việt Nam Dân chủ Cộng hòa.' },
      { time: '02/09/1945', text: 'Chính phủ lâm thời ra mắt quốc dân và toàn thể nhân dân đồng thanh tuyên thệ bảo vệ nền độc lập.' }
    ],
    significance: 'Đánh dấu mốc son chói lọi trong lịch sử dân tộc và Lịch sử Đảng: Đảng từ một đảng hoạt động bí mật đã trở thành đảng cầm quyền, lãnh đạo Nhà nước và xã hội.'
  }
];

// Cấu hình các lớp bản đồ miễn phí, tải tức thì, không cần API key
const BASEMAP_OPTIONS = {
  terrain: {
    id: 'terrain',
    label: 'Địa hình',
    icon: '🏔️',
    desc: 'Bản đồ địa hình chiến khu & đồi núi',
    url: 'https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',
    maxZoom: 18,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
  },
  satellite: {
    id: 'satellite',
    label: 'Vệ tinh',
    icon: '🛰️',
    desc: 'Ảnh vệ tinh chụp toàn cảnh thực tế',
    url: 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
    maxZoom: 18,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
  },
  streets: {
    id: 'streets',
    label: 'Địa chính',
    icon: '🗺️',
    desc: 'Bản đồ giao thông & địa giới rõ nét',
    url: 'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
    maxZoom: 18,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
  },
  vintage: {
    id: 'vintage',
    label: 'Cổ điển',
    icon: '📜',
    desc: 'Bản đồ tư liệu địa lý Atlas phong cách cổ',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
    maxZoom: 18,
    subdomains: []
  }
};

export default function HistoricalMap() {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersLayerRef = useRef(null);
  const tileLayerRef = useRef(null);
  const timelineRef = useRef(null);

  // Quản lý âm thanh
  const audioRef = useRef(null);
  const audioCtxRef = useRef(null);
  const gainNodeRef = useRef(null);

  // Quản lý trạng thái
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [infoTab, setInfoTab] = useState('authors');
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [showAudioPrompt, setShowAudioPrompt] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [activeBasemap, setActiveBasemap] = useState('streets');
  const [showBasemapMenu, setShowBasemapMenu] = useState(false);
  const [isTourRunning, setIsTourRunning] = useState(false);
  const [themeMode, setThemeMode] = useState('auto');
  const tourTimerRef = useRef(null);

  const effectiveTheme = themeMode === 'auto'
    ? (activeBasemap === 'satellite' ? 'dark' : 'light')
    : themeMode;

  const categories = [
    { key: 'ALL', label: 'Tất cả', count: 11, icon: '⭐' },
    { key: 'chutruong', label: 'Chủ trương', count: 3, icon: '📜' },
    { key: 'khoinghia', label: 'Khởi nghĩa', count: 3, icon: '⚔️' },
    { key: 'lucluong', label: 'Xây dựng lực lượng', count: 2, icon: '🛡️' },
    { key: 'tongkhoinghia', label: 'Tổng khởi nghĩa', count: 5, icon: '🏆' }
  ];

  const matchesCategory = (ev, catKey) => {
    if (catKey === 'ALL') return true;
    const cat = ev.category.toLowerCase();
    if (catKey === 'chutruong') {
      return cat.includes('chủ trương') || cat.includes('đường lối');
    }
    if (catKey === 'khoinghia') {
      return cat.includes('khởi nghĩa') || cat.includes('binh biến') || cat.includes('binh vận');
    }
    if (catKey === 'lucluong') {
      return cat.includes('lực lượng') || cat.includes('quân sự');
    }
    if (catKey === 'tongkhoinghia') {
      return cat.includes('tổng khởi nghĩa') || cat.includes('thắng lợi') || cat.includes('chớp thời cơ') || cat.includes('hoạch định');
    }
    return true;
  };

  const filteredEvents = historicalEvents.filter(ev => matchesCategory(ev, filterCategory));

  // 1. KHỞI TẠO BẢN ĐỒ VÀ GẮN CHỦ QUYỀN BIỂN ĐẢO VIỆT NAM
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const strictBounds = [
      [5.0, 99.0],
      [27.5, 121.0]
    ];

    const isMobile = window.innerWidth <= 768;

    const map = L.map(mapContainerRef.current, {
      center: isMobile ? [16.0, 107.5] : [16.2, 107.8],
      zoom: isMobile ? 5.2 : 5.85,
      minZoom: isMobile ? 4.8 : 5.5,
      maxZoom: 18,
      maxBounds: strictBounds,
      maxBoundsViscosity: 0.8,
      zoomControl: false
    });

    L.control.zoom({ position: isMobile ? 'topright' : 'bottomright' }).addTo(map);

    // Lớp tile bản đồ mặc định
    const currentCfg = BASEMAP_OPTIONS[activeBasemap] || BASEMAP_OPTIONS.terrain;
    const initialTileLayer = L.tileLayer(currentCfg.url, {
      attribution: '&copy; Google Maps / Bản đồ số Lịch sử',
      subdomains: currentCfg.subdomains.length ? currentCfg.subdomains : 'abc',
      maxZoom: currentCfg.maxZoom
    }).addTo(map);

    tileLayerRef.current = initialTileLayer;

    // Biểu tượng Lá cờ Tổ quốc Việt Nam SVG sắc nét
    const vietnamFlagSvg = `
      <svg class="island-flag-svg" viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg">
        <rect width="30" height="20" fill="#da251d" rx="2" />
        <polygon points="15,4 16.35,8.14 20.71,8.15 17.18,10.71 18.53,14.85 15,12.3 11.47,14.85 12.82,10.71 9.29,8.15 13.65,8.14" fill="#ffeb3b" />
      </svg>
    `;

    // Nhãn chủ quyền Hoàng Sa (Lá cờ + Tên địa danh)
    const hoangSaBadge = L.divIcon({
      className: 'custom-island-marker-wrapper',
      html: `
        <div class="sovereign-island-label">
          ${vietnamFlagSvg}
          <div class="island-info">
            <strong class="island-title">QUẦN ĐẢO HOÀNG SA</strong>
            <span class="island-sub">Huyện Hoàng Sa • TP. Đà Nẵng</span>
          </div>
        </div>
      `,
      iconSize: [260, 42],
      iconAnchor: [12, 21]
    });

    // Nhãn chủ quyền Trường Sa (Lá cờ + Tên địa danh)
    const truongSaBadge = L.divIcon({
      className: 'custom-island-marker-wrapper',
      html: `
        <div class="sovereign-island-label">
          ${vietnamFlagSvg}
          <div class="island-info">
            <strong class="island-title">QUẦN ĐẢO TRƯỜNG SA</strong>
            <span class="island-sub">Huyện Trường Sa • Tỉnh Khánh Hòa</span>
          </div>
        </div>
      `,
      iconSize: [260, 42],
      iconAnchor: [12, 21]
    });

    L.marker([16.7, 112.5], { icon: hoangSaBadge, interactive: false }).addTo(map);
    L.marker([10.4, 114.2], { icon: truongSaBadge, interactive: false }).addTo(map);

    markersLayerRef.current = L.layerGroup().addTo(map);

    const handleResize = () => {
      map.invalidateSize();
      setTimeout(() => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize();
        }
      }, 250);
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    mapInstanceRef.current = map;

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // 2. THAY ĐỔI LỚP BẢN ĐỒ KHI NGƯỜI DÙNG CHỌN
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    if (tileLayerRef.current) {
      mapInstanceRef.current.removeLayer(tileLayerRef.current);
    }
    const currentCfg = BASEMAP_OPTIONS[activeBasemap] || BASEMAP_OPTIONS.terrain;
    const newLayer = L.tileLayer(currentCfg.url, {
      attribution: '&copy; Google / Esri / Bản đồ số Lịch sử',
      subdomains: currentCfg.subdomains.length ? currentCfg.subdomains : 'abc',
      maxZoom: currentCfg.maxZoom
    }).addTo(mapInstanceRef.current);

    newLayer.bringToBack();
    tileLayerRef.current = newLayer;
  }, [activeBasemap]);

  // 3. VẼ MARKER ĐỊA DANH MỐC SON LÊN BẢN ĐỒ
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;

    markersLayerRef.current.clearLayers();

    filteredEvents.forEach((ev) => {
      const isSelected = selectedEvent?.id === ev.id;
      const originalIndex = historicalEvents.findIndex(e => e.id === ev.id) + 1;
      const shortName = ev.title.split('&')[0].split(':')[0].replace(/\(.*?\)/g, '').trim();
      const year = ev.date.slice(-4);

      const markerHtml = `
        <div class="custom-heritage-pin ${isSelected ? 'is-selected' : ''}">
          <div class="pin-radar-ring"></div>
          <div class="pin-core-badge">
            <span class="pin-icon-star">★</span>
            <span class="pin-order-num">${originalIndex}</span>
          </div>
          <div class="pin-floating-tag">
            <span class="pin-tag-title">${shortName}</span>
            <span class="pin-tag-year">${year}</span>
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        html: markerHtml,
        className: 'marker-container-box',
        iconSize: [44, 44],
        iconAnchor: [22, 22]
      });

      const marker = L.marker(ev.coords, { icon: customIcon });
      marker.on('click', () => {
        stopTour();
        handleSelectEvent(ev);
      });

      markersLayerRef.current.addLayer(marker);
    });
  }, [filteredEvents, selectedEvent]);

  // 4. QUẢN LÝ ÂM THANH NỀN HÀO HÙNG
  const getAudioInstance = () => {
    if (!audioRef.current) {
      const audio = new Audio(themeSong);
      audio.loop = true;
      audio.preload = 'auto';

      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          const ctx = new AudioContext();
          const gainNode = ctx.createGain();
          gainNode.gain.value = 0.22;

          const source = ctx.createMediaElementSource(audio);
          source.connect(gainNode);
          gainNode.connect(ctx.destination);

          audioCtxRef.current = ctx;
          gainNodeRef.current = gainNode;
        }
      } catch (err) {
        console.warn("Fallback HTML Audio:", err);
        audio.volume = 0.22;
      }

      audio.onplay = () => setIsPlayingMusic(true);
      audio.onpause = () => setIsPlayingMusic(false);

      audioRef.current = audio;
    }
    return audioRef.current;
  };

  const fadeVolume = (targetVolume, duration = 0.8) => {
    if (gainNodeRef.current && audioCtxRef.current) {
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();
      const currentVal = gainNodeRef.current.gain.value;
      gainNodeRef.current.gain.cancelScheduledValues(ctx.currentTime);
      gainNodeRef.current.gain.setValueAtTime(currentVal, ctx.currentTime);
      gainNodeRef.current.gain.linearRampToValueAtTime(targetVolume, ctx.currentTime + duration);
      return;
    }
    if (audioRef.current) {
      audioRef.current.volume = targetVolume;
    }
  };

  useEffect(() => {
    const handleYouTubeMessage = (event) => {
      try {
        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        if (data && data.event === 'onStateChange') {
          if (data.info === 1) setIsVideoPlaying(true);
          else if (data.info === 2 || data.info === 0) setIsVideoPlaying(false);
        }
      } catch {}
    };
    window.addEventListener('message', handleYouTubeMessage);
    return () => window.removeEventListener('message', handleYouTubeMessage);
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;
    if (selectedEvent || isVideoPlaying) {
      fadeVolume(0.06, 0.5);
    } else {
      fadeVolume(0.22, 1.2);
    }
  }, [selectedEvent, isVideoPlaying]);

  const handleEnableAudio = () => {
    const audio = getAudioInstance();
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    audio.play().then(() => setIsPlayingMusic(true)).catch(console.error);
    setShowAudioPrompt(false);
  };

  const toggleMusic = () => {
    const audio = getAudioInstance();
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    if (audio.paused) {
      audio.play().catch(console.error);
    } else {
      audio.pause();
    }
  };

  // 5. ĐIỀU HƯỚNG SỰ KIỆN & THAM QUAN TỰ ĐỘNG
  const handleSelectEvent = (ev) => {
    setIsVideoPlaying(false);
    setSelectedEvent(ev);
    if (mapInstanceRef.current) {
      const isMobile = window.innerWidth <= 768;
      const targetLat = isMobile ? ev.coords[0] - 0.4 : ev.coords[0];
      mapInstanceRef.current.flyTo([targetLat, ev.coords[1]], 8.8, {
        duration: 1.2,
        easeLinearity: 0.25
      });
    }

    // Cuộn timeline đến nút đang chọn
    if (timelineRef.current) {
      const activeBtn = timelineRef.current.querySelector(`[data-id="${ev.id}"]`);
      if (activeBtn) {
        activeBtn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  };

  const handleCloseSidebar = () => {
    stopTour();
    setIsVideoPlaying(false);
    setSelectedEvent(null);
  };

  const handleCategoryChange = (catKey) => {
    stopTour();
    setFilterCategory(catKey);
    if (timelineRef.current) timelineRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    if (selectedEvent && !matchesCategory(selectedEvent, catKey)) {
      setIsVideoPlaying(false);
      setSelectedEvent(null);
    }
  };

  const scrollTimeline = (dir) => {
    if (timelineRef.current) {
      const scrollAmount = dir === 'left' ? -280 : 280;
      timelineRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Chế độ tham quan tự động
  const startTour = () => {
    setIsTourRunning(true);
    setFilterCategory('ALL');
    let idx = 0;
    const runStep = (i) => {
      if (i >= historicalEvents.length) {
        setIsTourRunning(false);
        return;
      }
      handleSelectEvent(historicalEvents[i]);
      tourTimerRef.current = setTimeout(() => {
        runStep(i + 1);
      }, 7500);
    };
    runStep(idx);
  };

  const stopTour = () => {
    if (tourTimerRef.current) {
      clearTimeout(tourTimerRef.current);
      tourTimerRef.current = null;
    }
    setIsTourRunning(false);
  };

  // Tìm sự kiện trước và sau để điều hướng trong sidebar
  const currentEventIdx = selectedEvent ? historicalEvents.findIndex(e => e.id === selectedEvent.id) : -1;
  const prevEvent = currentEventIdx > 0 ? historicalEvents[currentEventIdx - 1] : null;
  const nextEvent = currentEventIdx >= 0 && currentEventIdx < historicalEvents.length - 1 ? historicalEvents[currentEventIdx + 1] : null;

  return (
    <div className="heritage-map-app" data-theme={effectiveTheme} data-basemap={activeBasemap}>
      {/* 1. THANH TIÊU ĐỀ CHÍNH (HEADER) */}
      <header className="heritage-navbar">
        <div className="nav-brand-section">
          <div className="national-emblem-badge">
            <span className="emblem-star">★</span>
          </div>
          <div className="brand-text-block">
            <h1 className="brand-main-title">BẢN ĐỒ MỐC SON LỊCH SỬ (1939 - 1945)</h1>
            <p className="brand-sub-title">Sản phẩm sáng tạo VNR202 • Lịch sử Đảng Cộng sản Việt Nam (Đại học FPT)</p>
          </div>
        </div>

        {/* Thanh công cụ điều khiển nhanh */}
        <div className="nav-toolbar-section">
          {/* Nút chọn kiểu bản đồ */}
          <div className="basemap-selector-dropdown">
            <button
              className="toolbar-btn basemap-trigger-btn"
              onClick={() => setShowBasemapMenu(!showBasemapMenu)}
              title="Đổi kiểu bản đồ hiển thị"
            >
              <span className="btn-icon">{BASEMAP_OPTIONS[activeBasemap]?.icon}</span>
              <span className="btn-label">{BASEMAP_OPTIONS[activeBasemap]?.label}</span>
              <span className="dropdown-caret">▾</span>
            </button>

            {showBasemapMenu && (
              <div className="basemap-menu-popover" onClick={() => setShowBasemapMenu(false)}>
                <div className="popover-heading">Chọn kiểu bản đồ:</div>
                {Object.values(BASEMAP_OPTIONS).map((opt) => (
                  <button
                    key={opt.id}
                    className={`basemap-option-item ${activeBasemap === opt.id ? 'active' : ''}`}
                    onClick={() => setActiveBasemap(opt.id)}
                  >
                    <span className="opt-icon">{opt.icon}</span>
                    <div className="opt-text">
                      <strong className="opt-name">{opt.label}</strong>
                      <small className="opt-desc">{opt.desc}</small>
                    </div>
                    {activeBasemap === opt.id && <span className="opt-check">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Nút chuyển đổi Giao diện Sáng / Tối */}
          <button
            className="toolbar-btn theme-toggle-btn"
            onClick={() => setThemeMode(effectiveTheme === 'light' ? 'dark' : 'light')}
            title={effectiveTheme === 'light' ? "Chuyển sang giao diện Tối" : "Chuyển sang giao diện Sáng"}
          >
            <span className="btn-icon">{effectiveTheme === 'light' ? '☀️' : '🌙'}</span>
            <span className="btn-label desktop-only">{effectiveTheme === 'light' ? 'Sáng' : 'Tối'}</span>
          </button>

          {/* Nút Tham quan tự động (Auto Tour) */}
          <button
            className={`toolbar-btn tour-btn ${isTourRunning ? 'running' : ''}`}
            onClick={isTourRunning ? stopTour : startTour}
            title={isTourRunning ? "Dừng hành trình tự động" : "Bắt đầu hành trình tự động qua các mốc son"}
          >
            <span className="btn-icon">{isTourRunning ? '⏹' : '▶'}</span>
            <span className="btn-label">{isTourRunning ? 'Dừng Tour' : 'Khám phá tự động'}</span>
          </button>

          {/* Nút Âm thanh nền */}
          <button
            className={`toolbar-btn music-btn ${isPlayingMusic ? 'is-playing' : ''}`}
            onClick={toggleMusic}
            title={isPlayingMusic ? "Tắt nhạc nền" : "Bật nhạc nền hào hùng"}
          >
            <span className="btn-icon">{isPlayingMusic ? '🔊' : '🔇'}</span>
            <span className="btn-label desktop-only">{isPlayingMusic ? 'Nhạc nền: BẬT' : 'Nhạc nền: TẮT'}</span>
          </button>

          {/* Nút Hồ sơ đề tài & tác giả */}
          <button 
            className="toolbar-btn info-btn" 
            onClick={() => setShowInfoModal(true)}
            title="Xem hồ sơ nhóm tác giả & tư liệu tham khảo"
          >
            <span className="btn-icon">🏛️</span>
            <span className="btn-label desktop-only">Hồ sơ & Tư liệu</span>
          </button>
        </div>
      </header>

      {/* 2. THANH BỘ LỌC CHỦ ĐỀ CÁCH MẠNG */}
      <nav className="heritage-filter-ribbon">
        <div className="filter-chips-container">
          {categories.map((cat) => (
            <button
              key={cat.key}
              className={`heritage-chip ${filterCategory === cat.key ? 'is-active' : ''}`}
              onClick={() => handleCategoryChange(cat.key)}
            >
              <span className="chip-symbol">{cat.icon}</span>
              <span className="chip-text">{cat.label}</span>
              <span className="chip-count-pill">{cat.count}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* 3. KHU VỰC BẢN ĐỒ TƯƠNG TÁC */}
      <main className="heritage-map-canvas" ref={mapContainerRef} />

      {/* 4. DÒNG THỜI GIAN NGANG (HORIZONTAL TIMELINE) */}
      <section className={`heritage-timeline-dock ${selectedEvent ? 'has-drawer' : ''}`}>
        <button 
          className="dock-nav-btn prev" 
          onClick={() => scrollTimeline('left')}
          title="Xem mốc trước"
        >
          ‹
        </button>

        <div className="dock-scroll-track" ref={timelineRef}>
          {filteredEvents.map((ev) => {
            const isCurrent = selectedEvent?.id === ev.id;
            const originalIndex = historicalEvents.findIndex(e => e.id === ev.id) + 1;
            const shortName = ev.title.split('&')[0].split(':')[0].trim();
            const dateStr = ev.date.split('–')[0].trim();

            return (
              <button
                key={ev.id}
                data-id={ev.id}
                className={`timeline-milestone-card ${isCurrent ? 'is-focused' : ''}`}
                onClick={() => {
                  stopTour();
                  handleSelectEvent(ev);
                }}
              >
                <div className="card-top-meta">
                  <span className="order-badge">Mốc {originalIndex}</span>
                  <span className="date-badge">{dateStr}</span>
                </div>
                <div className="card-title-text">{shortName}</div>
              </button>
            );
          })}
        </div>

        <button 
          className="dock-nav-btn next" 
          onClick={() => scrollTimeline('right')}
          title="Xem mốc kế tiếp"
        >
          ›
        </button>
      </section>

      {/* 5. SIDEBAR CHI TIẾT SỰ KIỆN LỊCH SỬ */}
      <aside className={`heritage-detail-drawer ${selectedEvent ? 'is-open' : ''}`}>
        {selectedEvent && (
          <div className="drawer-inner-content">
            {/* Thanh điều khiển trên cùng */}
            <div className="drawer-header-strip">
              <div className="drawer-category-pill">
                <span className="cat-icon">⭐</span>
                <span>{selectedEvent.category}</span>
              </div>
              <button 
                className="drawer-close-icon-btn" 
                onClick={handleCloseSidebar}
                title="Đóng bảng chi tiết"
              >
                ✕
              </button>
            </div>

            {/* Điều hướng mốc trước / sau ngay trong sidebar */}
            <div className="drawer-step-navigation">
              <button 
                disabled={!prevEvent}
                className="step-nav-btn prev-btn"
                onClick={() => prevEvent && handleSelectEvent(prevEvent)}
              >
                ← Mốc trước
              </button>
              <span className="step-counter">
                {currentEventIdx + 1} / {historicalEvents.length}
              </span>
              <button 
                disabled={!nextEvent}
                className="step-nav-btn next-btn"
                onClick={() => nextEvent && handleSelectEvent(nextEvent)}
              >
                Mốc sau →
              </button>
            </div>

            {/* Tiêu đề & Ngày diễn ra */}
            <div className="drawer-event-headline">
              <div className="event-date-callout">📅 {selectedEvent.date}</div>
              <h2 className="event-main-title">{selectedEvent.title}</h2>
            </div>

            {/* Trích dẫn trọng tâm */}
            <div className="drawer-highlight-quote">
              <span className="quote-mark">“</span>
              <p className="quote-text">{selectedEvent.highlight}</p>
            </div>

            {/* Video tư liệu lịch sử */}
            <div className="drawer-video-container">
              <div className="video-player-wrapper">
                <iframe
                  title={selectedEvent.title}
                  src={`${selectedEvent.videoEmbed}?enablejsapi=1`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  onLoad={(e) => {
                    e.target.contentWindow?.postMessage('{"event":"listening"}', '*');
                  }}
                />
              </div>
              <div className="video-source-caption">
                <span className="caption-icon">📺</span>
                <span>Nguồn tư liệu: <strong>{selectedEvent.videoSource}</strong></span>
              </div>
            </div>

            {/* Khối con số và thông số trọng yếu */}
            <div className="drawer-stats-section">
              <h3 className="section-title">THÔNG SỐ & LỰC LƯỢNG</h3>
              <div className="stats-cards-grid">
                {selectedEvent.stats.map((s, idx) => (
                  <div key={idx} className="stat-highlight-card">
                    <span className="stat-value">{s.val}</span>
                    <span className="stat-label">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Nhân vật lịch sử chủ chốt */}
            <div className="drawer-figures-section">
              <h3 className="section-title">NHÂN VẬT LÃNH ĐẠO CHỦ CHỐT</h3>
              <div className="figures-tags-wrap">
                {selectedEvent.figures.map((fig, idx) => (
                  <div key={idx} className="figure-badge">
                    <span className="figure-avatar">👤</span>
                    <span className="figure-name">{fig}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Diễn biến theo dòng thời gian */}
            <div className="drawer-timeline-section">
              <h3 className="section-title">DIỄN BIẾN SỰ KIỆN TRỌNG TÂM</h3>
              <div className="vertical-timeline-steps">
                {selectedEvent.timelineSteps.map((step, idx) => (
                  <div key={idx} className="timeline-step-row">
                    <div className="step-time-node">
                      <span className="node-dot"></span>
                      <span className="node-time">{step.time}</span>
                    </div>
                    <div className="step-text-bubble">
                      <p>{step.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ý nghĩa lịch sử & Bài học */}
            <div className="drawer-significance-card">
              <div className="significance-header">
                <span className="sig-icon">📜</span>
                <h4>Ý NGHĨA LỊCH SỬ & BÀI HỌC KINH NGHIỆM</h4>
              </div>
              <p className="sig-body">{selectedEvent.significance}</p>
            </div>

            {/* Chú thích nguồn tài liệu */}
            <div className="drawer-footer-reference">
              <p>📖 Trích dẫn chính thức từ <em>Văn kiện Đảng Toàn tập (Tập 7)</em> và <em>Giáo trình Lịch sử Đảng Cộng sản Việt Nam</em>.</p>
            </div>
          </div>
        )}
      </aside>

      {/* 6. MODAL HỒ SƠ ĐỀ TÀI & TÀI LIỆU */}
      {showInfoModal && (
        <div className="heritage-modal-backdrop" onClick={() => setShowInfoModal(false)}>
          <div className="heritage-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-dialog-header">
              <div className="dialog-title-group">
                <span className="dialog-emblem">🏛️</span>
                <div>
                  <h3 className="dialog-heading">SẢN PHẨM SÁNG TẠO MÔN HỌC VNR202</h3>
                  <p className="dialog-sub">Lịch sử Đảng Cộng sản Việt Nam — Trường Đại học FPT</p>
                </div>
              </div>
              <button 
                className="dialog-close-btn" 
                onClick={() => setShowInfoModal(false)}
                title="Đóng cửa sổ"
              >
                ✕
              </button>
            </div>

            {/* Thanh Tab */}
            <div className="dialog-tab-bar">
              <button 
                className={`tab-btn ${infoTab === 'authors' ? 'is-active' : ''}`}
                onClick={() => setInfoTab('authors')}
              >
                👤 Nhóm Tác Giả (Nhóm 6)
              </button>
              <button 
                className={`tab-btn ${infoTab === 'curriculum' ? 'is-active' : ''}`}
                onClick={() => setInfoTab('curriculum')}
              >
                🎓 Khung Môn Học VNR202
              </button>
              <button 
                className={`tab-btn ${infoTab === 'references' ? 'is-active' : ''}`}
                onClick={() => setInfoTab('references')}
              >
                📚 Tư Liệu & Tham Khảo
              </button>
            </div>

            <div className="dialog-tab-body">
              {infoTab === 'authors' && (
                <div className="tab-pane-content">
                  <div className="project-intro-banner">
                    <h4>ĐỀ TÀI: BẢN ĐỒ SỐ ĐỊA DANH PHONG TRÀO GIẢI PHÓNG DÂN TỘC (1939 - 1945)</h4>
                    <p>Sản phẩm sáng tạo học phần <strong>VNR202 – Lịch sử Đảng Cộng sản Việt Nam</strong> tại Trường Đại học FPT. Ứng dụng công nghệ bản đồ số GIS kết hợp dữ liệu tương tác đa phương tiện số hóa không gian lịch sử thời kỳ tiền khởi nghĩa và Cách mạng Tháng Tám 1945 thuộc <strong>Chương 1</strong> giáo trình chuẩn.</p>
                  </div>
                  
                  <div className="lecturer-section">
                    <span className="role-caption">GIẢNG VIÊN HƯỚNG DẪN:</span>
                    <div className="lecturer-card">
                      <div className="lecturer-avatar">⭐</div>
                      <div className="lecturer-info">
                        <strong>Thầy Kiều Văn Nam</strong>
                        <span>Bộ môn Lý luận Chính trị • Trường Đại học FPT</span>
                      </div>
                    </div>
                  </div>

                  <div className="members-section">
                    <span className="role-caption">THÀNH VIÊN NHÓM THỰC HIỆN — NHÓM 6 (11 THÀNH VIÊN):</span>
                    <div className="members-grid-layout">
                      {[
                        { mssv: 'HA173007', name: 'Nông Khánh Ly' },
                        { mssv: 'HA176019', name: 'Hà Kiều Nương' },
                        { mssv: 'HS170496', name: 'Nguyễn Minh Hiếu' },
                        { mssv: 'HS180378', name: 'Dương Thị Như Quỳnh' },
                        { mssv: 'HS181003', name: 'Nguyễn Trần Mai Phương' },
                        { mssv: 'HS186181', name: 'Trần Thục Quyên' },
                        { mssv: 'HE190810', name: 'Nguyễn Hữu Long' },
                        { mssv: 'HS180642', name: 'Nguyễn Thị Thuỳ Trang' },
                        { mssv: 'HS180737', name: 'Nguyễn Thị Thu' },
                        { mssv: 'HS186211', name: 'Trần Thị Thanh Hiền' },
                        { mssv: 'HS181177', name: 'Vũ Thu Hà' }
                      ].map((member, idx) => (
                        <div key={member.mssv} className="member-card">
                          <div className="member-avatar">{idx + 1}</div>
                          <div className="member-meta">
                            <span className="member-name">{member.name}</span>
                            <span className="member-mssv">MSSV: {member.mssv}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="class-info-banner">
                    <strong>Thông tin học phần:</strong> Nhóm 6 • Môn VNR202 (Lịch sử Đảng Cộng sản Việt Nam) • Trường Đại học FPT • GVHD: Thầy Kiều Văn Nam.
                  </div>
                </div>
              )}

              {infoTab === 'curriculum' && (
                <div className="tab-pane-content">
                  <div className="curriculum-overview-card">
                    <div className="curriculum-badge">MÔN HỌC CHUẨN: VNR202</div>
                    <h4>LỊCH SỬ ĐẢNG CỘNG SẢN VIỆT NAM — ĐẠI HỌC FPT</h4>
                    <p className="curriculum-desc">
                      Chương trình chuẩn gồm <strong>1 Chương nhập môn</strong> và <strong>3 Chương nội dung cốt lõi</strong>. Dự án là sản phẩm sáng tạo chuyên sâu của <strong>Chương 1</strong>:
                    </p>
                  </div>

                  <span className="role-caption">VỊ TRÍ ĐỀ TÀI TRONG CẤU TRÚC 3 CHƯƠNG CỦA MÔN HỌC:</span>

                  <div className="curriculum-chapters-list">
                    {/* Nhập môn */}
                    <div className="chapter-box">
                      <div className="chapter-badge">Nhập môn</div>
                      <div className="chapter-detail">
                        <strong className="chapter-title">Đối tượng, chức năng, nhiệm vụ và phương pháp nghiên cứu môn học</strong>
                        <p className="chapter-text">Trang bị thế giới quan khoa học, phương pháp lịch sử và phương pháp logic trong nghiên cứu lịch sử Đảng.</p>
                      </div>
                    </div>

                    {/* Chương 1 - Trọng tâm */}
                    <div className="chapter-box is-highlighted">
                      <div className="chapter-badge highlight-badge">Chương 1 (1930 – 1945) ★ TRỌNG TÂM ĐỀ TÀI</div>
                      <div className="chapter-detail">
                        <strong className="chapter-title highlight-title">Đảng ra đời và lãnh đạo đấu tranh giành chính quyền (1930 – 1945)</strong>
                        <div className="chapter-sub-points">
                          <div>• Hoạt động của Nguyễn Ái Quốc và Hội nghị thành lập Đảng năm 1930.</div>
                          <div>• Các phong trào cách mạng 1930 – 1931 và phong trào dân chủ 1936 – 1939.</div>
                          <div className="target-sub-point">
                            📍 <strong>Phạm vi số hóa trực tiếp của dự án:</strong> Phong trào giải phóng dân tộc (1939 – 1945) và Cách mạng Tháng Tám. Tái hiện chuyển hướng chỉ đạo chiến lược (Hội nghị TW 8 Pác Bó), khởi nghĩa từng phần (Bắc Sơn, Nam Kỳ, Đô Lương), thành lập Đội VNTTGPQ, Quốc dân Đại hội Tân Trào đến Tổng khởi nghĩa giành chính quyền ở Hà Nội, Huế, Sài Gòn và Tuyên ngôn Độc lập Ba Đình 02/09/1945.
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Chương 2 */}
                    <div className="chapter-box">
                      <div className="chapter-badge">Chương 2 (1945 – 1975)</div>
                      <div className="chapter-detail">
                        <strong className="chapter-title">Đảng lãnh đạo hai cuộc kháng chiến (1945 – 1975)</strong>
                        <p className="chapter-text">Kháng chiến chống thực dân Pháp kết thúc bằng Chiến thắng Điện Biên Phủ (1954); Kháng chiến chống đế quốc Mỹ giải phóng hoàn toàn miền Nam, thống nhất đất nước (1975).</p>
                      </div>
                    </div>

                    {/* Chương 3 */}
                    <div className="chapter-box">
                      <div className="chapter-badge">Chương 3 (1975 – nay)</div>
                      <div className="chapter-detail">
                        <strong className="chapter-title">Đảng lãnh đạo cả nước đi lên CNXH và tiến hành công cuộc Đổi mới</strong>
                        <p className="chapter-text">Xây dựng và bảo vệ Tổ quốc xã hội chủ nghĩa; đường lối đổi mới toàn diện đất nước từ Đại hội VI (1986) đến nay.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {infoTab === 'references' && (
                <div className="tab-pane-content">
                  <span className="role-caption">VĂN KIỆN & TÀI LIỆU LỊCH SỬ CHÍNH THỐNG:</span>
                  <ul className="doc-reference-list">
                    <li className="doc-item">
                      <span className="doc-num">01</span>
                      <div className="doc-content">
                        <strong>Giáo trình Lịch sử Đảng Cộng sản Việt Nam (VNR202)</strong>
                        <p>NXB Chính trị quốc gia Sự thật – Giáo trình chuẩn dành cho sinh viên Đại học FPT.</p>
                      </div>
                    </li>
                    <li className="doc-item">
                      <span className="doc-num">02</span>
                      <div className="doc-content">
                        <strong>Văn kiện Đảng Toàn tập (Tập 7: 1940 – 1945)</strong>
                        <p>Nghị quyết TW 6 (11/1939), TW 7 (11/1940), TW 8 (05/1941).</p>
                      </div>
                    </li>
                    <li className="doc-item">
                      <span className="doc-num">03</span>
                      <div className="doc-content">
                        <strong>Chỉ thị "Nhật - Pháp bắn nhau và hành động của chúng ta"</strong>
                        <p>Ban Thường vụ Trung ương Đảng ra ngày 12/03/1945 tại Đình Bảng, Từ Sơn, Bắc Ninh.</p>
                      </div>
                    </li>
                    <li className="doc-item">
                      <span className="doc-num">04</span>
                      <div className="doc-content">
                        <strong>Quân lệnh số 1 & Tuyên ngôn Độc lập (02/09/1945)</strong>
                        <p>Ủy ban Khởi nghĩa toàn quốc ban bố đêm 13/08/1945 và Chủ tịch Hồ Chí Minh đọc tại Quảng trường Ba Đình.</p>
                      </div>
                    </li>
                    <li className="doc-item">
                      <span className="doc-num">05</span>
                      <div className="doc-content">
                        <strong>Hồi ký "Những năm tháng không thể nào quên"</strong>
                        <p>Đại tướng Võ Nguyên Giáp, NXB Quân đội Nhân dân.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* 7. HỘP THOẠI MỜI BẬT NHẠC NỀN */}
      {showAudioPrompt && (
        <div className="heritage-audio-prompt-backdrop">
          <div className="heritage-audio-prompt-card">
            <div className="prompt-header-icon">🎺</div>
            <h3 className="prompt-title">BẠN CÓ MUỐN BẬT NHẠC NỀN HÀO HÙNG?</h3>
            <p className="prompt-desc">
              Trải nghiệm khám phá các mốc son lịch sử sẽ sống động và trang trọng hơn với giai điệu bài ca cách mạng.
            </p>
            <div className="prompt-buttons-row">
              <button className="prompt-confirm-btn" onClick={handleEnableAudio}>
                🔊 Bật nhạc nền ngay
              </button>
              <button className="prompt-dismiss-btn" onClick={() => setShowAudioPrompt(false)}>
                🔇 Khám phá không âm thanh
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}