// ==========================================================================
// HÓA HỌC 10 - NGÂN HÀNG KIẾN THỨC, BẢNG TUẦN HOÀN & LUYỆN ĐỀ TOÀN DIỆN
// Bám sát Chương trình GDPT 2018 (Kết nối tri thức, Cánh diều, Chân trời sáng tạo)
// ==========================================================================

// 1. DỮ LIỆU CÁC NGUYÊN TỐ TRONG BẢNG TUẦN HOÀN (118 NGUYÊN TỐ)
const ELEMENTS_DATA = [
  { z: 1, s: "H", nameVi: "Hydrogen", nameEn: "Hydrogen", mass: 1.008, period: 1, group: "IA", groupNum: 1, block: "s", cat: "nonmetal", config: "1s¹", eShells: [1], en: 2.20, r: 53, ox: [-1, 1], state: "gas", desc: "Nguyên tố phổ biến nhất trong vũ trụ, tạo nên nước và các hợp chất hữu cơ." },
  { z: 2, s: "He", nameVi: "Helium", nameEn: "Helium", mass: 4.0026, period: 1, group: "VIIIA", groupNum: 18, block: "s", cat: "noble", config: "1s²", eShells: [2], en: null, r: 31, ox: [0], state: "gas", desc: "Khí hiếm nhẹ thứ hai, cấu hình e bền vững (2e lớp ngoài cùng), không cháy." },
  { z: 3, s: "Li", nameVi: "Lithium", nameEn: "Lithium", mass: 6.94, period: 2, group: "IA", groupNum: 1, block: "s", cat: "alkali", config: "[He] 2s¹", eShells: [2, 1], en: 0.98, r: 167, ox: [1], state: "solid", desc: "Kim loại nhẹ nhất, mềm, phản ứng mạnh với nước, dùng làm pin Lithium-ion." },
  { z: 4, s: "Be", nameVi: "Beryllium", nameEn: "Beryllium", mass: 9.0122, period: 2, group: "IIA", groupNum: 2, block: "s", cat: "alkaline", config: "[He] 2s²", eShells: [2, 2], en: 1.57, r: 112, ox: [2], state: "solid", desc: "Kim loại kiềm thổ nhẹ, cứng, hợp chất có độc tính cao." },
  { z: 5, s: "B", nameVi: "Boron", nameEn: "Boron", mass: 10.81, period: 2, group: "IIIA", groupNum: 13, block: "p", cat: "metalloid", config: "[He] 2s² 2p¹", eShells: [2, 3], en: 2.04, r: 87, ox: [3], state: "solid", desc: "Á kim bán dẫn cứng, dùng trong sản xuất thủy tinh borosilicate chịu nhiệt." },
  { z: 6, s: "C", nameVi: "Carbon", nameEn: "Carbon", mass: 12.011, period: 2, group: "IVA", groupNum: 14, block: "p", cat: "nonmetal", config: "[He] 2s² 2p²", eShells: [2, 4], en: 2.55, r: 67, ox: [-4, -2, 2, 4], state: "solid", desc: "Cơ sở của sự sống hữu cơ, có các dạng thù hình nổi tiếng: kim cương, than chì, graphene." },
  { z: 7, s: "N", nameVi: "Nitrogen", nameEn: "Nitrogen", mass: 14.007, period: 2, group: "VA", groupNum: 15, block: "p", cat: "nonmetal", config: "[He] 2s² 2p³", eShells: [2, 5], en: 3.04, r: 56, ox: [-3, 1, 2, 3, 4, 5], state: "gas", desc: "Chiếm khoảng 78% thể tích khí quyển, phân tử N₂ có liên kết ba N≡N rất bền ở nhiệt độ thường." },
  { z: 8, s: "O", nameVi: "Oxygen", nameEn: "Oxygen", mass: 15.999, period: 2, group: "VIA", groupNum: 16, block: "p", cat: "nonmetal", config: "[He] 2s² 2p⁴", eShells: [2, 6], en: 3.44, r: 48, ox: [-2, -1, 2], state: "gas", desc: "Chiếm 21% thể tích không khí, duy trì sự hô hấp và sự cháy, độ âm điện lớn thứ 2." },
  { z: 9, s: "F", nameVi: "Fluorine", nameEn: "Fluorine", mass: 18.998, period: 2, group: "VIIA", groupNum: 17, block: "p", cat: "halogen", config: "[He] 2s² 2p⁵", eShells: [2, 7], en: 3.98, r: 42, ox: [-1], state: "gas", desc: "Phi kim mạnh nhất trong bảng tuần hoàn, có độ âm điện lớn nhất (3.98), tính oxi hóa cực mạnh." },
  { z: 10, s: "Ne", nameVi: "Neon", nameEn: "Neon", mass: 20.180, period: 2, group: "VIIIA", groupNum: 18, block: "p", cat: "noble", config: "[He] 2s² 2p⁶", eShells: [2, 8], en: null, r: 38, ox: [0], state: "gas", desc: "Khí hiếm phát ánh sáng màu đỏ cam đặc trưng khi phóng điện, dùng cho đèn quảng cáo neon." },
  { z: 11, s: "Na", nameVi: "Sodium", nameEn: "Sodium", mass: 22.990, period: 3, group: "IA", groupNum: 1, block: "s", cat: "alkali", config: "[Ne] 3s¹", eShells: [2, 8, 1], en: 0.93, r: 190, ox: [1], state: "solid", desc: "Kim loại kiềm mềm, dễ cắt bằng dao, phản ứng mãnh liệt với nước tạo dung dịch kiềm mạnh NaOH." },
  { z: 12, s: "Mg", nameVi: "Magnesium", nameEn: "Magnesium", mass: 24.305, period: 3, group: "IIA", groupNum: 2, block: "s", cat: "alkaline", config: "[Ne] 3s²", eShells: [2, 8, 2], en: 1.31, r: 145, ox: [2], state: "solid", desc: "Kim loại kiềm thổ màu trắng bạc, cháy với ngọn lửa sáng chói chói lòa, là thành phần diệp lục." },
  { z: 13, s: "Al", nameVi: "Aluminium", nameEn: "Aluminium", mass: 26.982, period: 3, group: "IIIA", groupNum: 13, block: "p", cat: "post-transition", config: "[Ne] 3s² 3p¹", eShells: [2, 8, 3], en: 1.61, r: 118, ox: [3], state: "solid", desc: "Kim loại phổ biến nhất trong vỏ Trái Đất, nhẹ, dẫn điện và dẫn nhiệt tốt, có màng Al₂O₃ bảo vệ." },
  { z: 14, s: "Si", nameVi: "Silicon", nameEn: "Silicon", mass: 28.085, period: 3, group: "IVA", groupNum: 14, block: "p", cat: "metalloid", config: "[Ne] 3s² 3p²", eShells: [2, 8, 4], en: 1.90, r: 111, ox: [-4, 2, 4], state: "solid", desc: "Chất bán dẫn cốt lõi của thời đại công nghệ vi mạch, chiếm khoảng 28% khối lượng vỏ Trái Đất." },
  { z: 15, s: "P", nameVi: "Phosphorus", nameEn: "Phosphorus", mass: 30.974, period: 3, group: "VA", groupNum: 15, block: "p", cat: "nonmetal", config: "[Ne] 3s² 3p³", eShells: [2, 8, 5], en: 2.19, r: 98, ox: [-3, 3, 5], state: "solid", desc: "Phi kim quan trọng cho cấu trúc xương và DNA; có 2 dạng thù hình chính: photpho trắng và photpho đỏ." },
  { z: 16, s: "S", nameVi: "Sulfur", nameEn: "Sulfur", mass: 32.06, period: 3, group: "VIA", groupNum: 16, block: "p", cat: "nonmetal", config: "[Ne] 3s² 3p⁴", eShells: [2, 8, 6], en: 2.58, r: 88, ox: [-2, 2, 4, 6], state: "solid", desc: "Chất rắn màu vàng tươi, dùng để sản xuất acid sulfuric H₂SO₄ - hóa chất công nghiệp hàng đầu." },
  { z: 17, s: "Cl", nameVi: "Chlorine", nameEn: "Chlorine", mass: 35.45, period: 3, group: "VIIA", groupNum: 17, block: "p", cat: "halogen", config: "[Ne] 3s² 3p⁵", eShells: [2, 8, 7], en: 3.16, r: 79, ox: [-1, 1, 3, 5, 7], state: "gas", desc: "Khí màu vàng lục, mùi hắc, độc hại, dùng khử trùng nước sinh hoạt và làm muối ăn NaCl." },
  { z: 18, s: "Ar", nameVi: "Argon", nameEn: "Argon", mass: 39.948, period: 3, group: "VIIIA", groupNum: 18, block: "p", cat: "noble", config: "[Ne] 3s² 3p⁶", eShells: [2, 8, 8], en: null, r: 71, ox: [0], state: "gas", desc: "Khí hiếm phổ biến thứ ba trong khí quyển Trái Đất (~0.93%), dùng làm môi trường trơ khi hàn kim loại." },
  { z: 19, s: "K", nameVi: "Potassium", nameEn: "Potassium", mass: 39.098, period: 3, group: "IA", groupNum: 1, block: "s", cat: "alkali", config: "[Ar] 4s¹", eShells: [2, 8, 8, 1], en: 0.82, r: 243, ox: [1], state: "solid", desc: "Kim loại kiềm rất hoạt động, cháy cho ngọn lửa màu tím hoa cà, ion K⁺ là chất điện giải thiết yếu." },
  { z: 20, s: "Ca", nameVi: "Calcium", nameEn: "Calcium", mass: 40.078, period: 3, group: "IIA", groupNum: 2, block: "s", cat: "alkaline", config: "[Ar] 4s²", eShells: [2, 8, 8, 2], en: 1.00, r: 194, ox: [2], state: "solid", desc: "Kim loại kiềm thổ, thành phần chủ yếu tạo nên xương, răng và đá vôi CaCO₃." },
  { z: 21, s: "Sc", nameVi: "Scandium", nameEn: "Scandium", mass: 44.956, period: 4, group: "IIIB", groupNum: 3, block: "d", cat: "transition", config: "[Ar] 3d¹ 4s²", eShells: [2, 8, 9, 2], en: 1.36, r: 184, ox: [3], state: "solid", desc: "Kim loại chuyển tiếp đầu tiên của chu kỳ 4, hợp kim với nhôm rất nhẹ và bền." },
  { z: 22, s: "Ti", nameVi: "Titanium", nameEn: "Titanium", mass: 47.867, period: 4, group: "IVB", groupNum: 4, block: "d", cat: "transition", config: "[Ar] 3d² 4s²", eShells: [2, 8, 10, 2], en: 1.54, r: 176, ox: [2, 3, 4], state: "solid", desc: "Kim loại chuyển tiếp có độ bền cơ học cao, chống ăn mòn tuyệt hảo, dùng trong hàng không và y tế." },
  { z: 23, s: "V", nameVi: "Vanadium", nameEn: "Vanadium", mass: 50.942, period: 4, group: "VB", groupNum: 5, block: "d", cat: "transition", config: "[Ar] 3d³ 4s²", eShells: [2, 8, 11, 2], en: 1.63, r: 171, ox: [2, 3, 4, 5], state: "solid", desc: "Kim loại chuyển tiếp, dùng làm phụ gia tăng độ bền và độ dai cho thép hợp kim." },
  { z: 24, s: "Cr", nameVi: "Chromium", nameEn: "Chromium", mass: 51.996, period: 4, group: "VIB", groupNum: 6, block: "d", cat: "transition", config: "[Ar] 3d⁵ 4s¹", eShells: [2, 8, 13, 1], en: 1.66, r: 166, ox: [2, 3, 6], state: "solid", desc: "CẤU HÌNH ĐẶC BIỆT: [Ar] 3d⁵ 4s¹ (bán bão hòa phân lớp d). Kim loại cứng nhất trong tất cả các kim loại (rạch được thủy tinh)." },
  { z: 25, s: "Mn", nameVi: "Manganese", nameEn: "Manganese", mass: 54.938, period: 4, group: "VIIB", groupNum: 7, block: "d", cat: "transition", config: "[Ar] 3d⁵ 4s²", eShells: [2, 8, 13, 2], en: 1.55, r: 161, ox: [2, 3, 4, 6, 7], state: "solid", desc: "Kim loại chuyển tiếp có nhiều số oxi hóa (từ +2 đến +7), hợp chất thuốc tím KMnO₄ là chất oxi hóa mạnh." },
  { z: 26, s: "Fe", nameVi: "Iron", nameEn: "Iron", mass: 55.845, period: 4, group: "VIIIB", groupNum: 8, block: "d", cat: "transition", config: "[Ar] 3d⁶ 4s²", eShells: [2, 8, 14, 2], en: 1.83, r: 156, ox: [2, 3], state: "solid", desc: "Kim loại công nghiệp cốt lõi, có từ tính, thành phần quan trọng trong hemoglobin vận chuyển oxy trong máu." },
  { z: 27, s: "Co", nameVi: "Cobalt", nameEn: "Cobalt", mass: 58.933, period: 4, group: "VIIIB", groupNum: 9, block: "d", cat: "transition", config: "[Ar] 3d⁷ 4s²", eShells: [2, 8, 15, 2], en: 1.88, r: 152, ox: [2, 3], state: "solid", desc: "Kim loại có từ tính, tạo màu xanh lam tuyệt đẹp cho gốm sứ và thủy tinh, thành phần vitamin B12." },
  { z: 28, s: "Ni", nameVi: "Nickel", nameEn: "Nickel", mass: 58.693, period: 4, group: "VIIIB", groupNum: 10, block: "d", cat: "transition", config: "[Ar] 3d⁸ 4s²", eShells: [2, 8, 16, 2], en: 1.91, r: 149, ox: [2, 3], state: "solid", desc: "Kim loại màu trắng ánh kim, chống ăn mòn tốt, dùng làm hợp kim thép không gỉ (Inox)." },
  { z: 29, s: "Cu", nameVi: "Copper", nameEn: "Copper", mass: 63.546, period: 4, group: "IB", groupNum: 11, block: "d", cat: "transition", config: "[Ar] 3d¹⁰ 4s¹", eShells: [2, 8, 18, 1], en: 1.90, r: 145, ox: [1, 2], state: "solid", desc: "CẤU HÌNH ĐẶC BIỆT: [Ar] 3d¹⁰ 4s¹ (bão hòa phân lớp d). Kim loại dẻo, màu đỏ cam, dẫn điện và dẫn nhiệt rất tốt." },
  { z: 30, s: "Zn", nameVi: "Zinc", nameEn: "Zinc", mass: 65.38, period: 4, group: "IIB", groupNum: 12, block: "d", cat: "transition", config: "[Ar] 3d¹⁰ 4s²", eShells: [2, 8, 18, 2], en: 1.65, r: 142, ox: [2], state: "solid", desc: "Kim loại màu lam nhạt, dùng mạ kẽm chống rỉ sét cho thép, vi chất dinh dưỡng thiết yếu." },
  { z: 31, s: "Ga", nameVi: "Gallium", nameEn: "Gallium", mass: 69.723, period: 4, group: "IIIA", groupNum: 13, block: "p", cat: "post-transition", config: "[Ar] 3d¹⁰ 4s² 4p¹", eShells: [2, 8, 18, 3], en: 1.81, r: 136, ox: [3], state: "solid", desc: "Kim loại nóng chảy ngay trong lòng bàn tay (nhiệt độ nóng chảy chỉ khoảng 29.76 °C)." },
  { z: 32, s: "Ge", nameVi: "Germanium", nameEn: "Germanium", mass: 72.630, period: 4, group: "IVA", groupNum: 14, block: "p", cat: "metalloid", config: "[Ar] 3d¹⁰ 4s² 4p²", eShells: [2, 8, 18, 4], en: 2.01, r: 125, ox: [2, 4], state: "solid", desc: "Á kim bán dẫn được Mendeleev dự đoán trước với tên gọi Eka-silicon." },
  { z: 33, s: "As", nameVi: "Arsenic", nameEn: "Arsenic", mass: 74.922, period: 4, group: "VA", groupNum: 15, block: "p", cat: "metalloid", config: "[Ar] 3d¹⁰ 4s² 4p³", eShells: [2, 8, 18, 5], en: 2.18, r: 114, ox: [-3, 3, 5], state: "solid", desc: "Thạch tín, á kim có độc tính cao, hợp chất As₂O₃ nổi tiếng trong lịch sử." },
  { z: 34, s: "Se", nameVi: "Selenium", nameEn: "Selenium", mass: 78.971, period: 4, group: "VIA", groupNum: 16, block: "p", cat: "nonmetal", config: "[Ar] 3d¹⁰ 4s² 4p⁴", eShells: [2, 8, 18, 6], en: 2.55, r: 103, ox: [-2, 4, 6], state: "solid", desc: "Phi kim có tính quang dẫn tốt (dẫn điện khi chiếu sáng), dùng trong máy photocopy và pin mặt trời." },
  { z: 35, s: "Br", nameVi: "Bromine", nameEn: "Bromine", mass: 79.904, period: 4, group: "VIIA", groupNum: 17, block: "p", cat: "halogen", config: "[Ar] 3d¹⁰ 4s² 4p⁵", eShells: [2, 8, 18, 7], en: 2.96, r: 94, ox: [-1, 1, 3, 5], state: "liquid", desc: "Đơn chất phi kim duy nhất ở thể lỏng ở điều kiện chuẩn, chất lỏng màu nâu đỏ bốc khói độc hại." },
  { z: 36, s: "Kr", nameVi: "Krypton", nameEn: "Krypton", mass: 83.798, period: 4, group: "VIIIA", groupNum: 18, block: "p", cat: "noble", config: "[Ar] 3d¹⁰ 4s² 4p⁶", eShells: [2, 8, 18, 8], en: 3.00, r: 88, ox: [0, 2], state: "gas", desc: "Khí hiếm phát ánh sáng trắng xanh khi phóng điện, dùng trong đèn flash chụp ảnh tốc độ cao." },
  // Các nguyên tố tiêu biểu chu kỳ 5, 6, 7
  { z: 37, s: "Rb", nameVi: "Rubidium", nameEn: "Rubidium", mass: 85.468, period: 5, group: "IA", groupNum: 1, block: "s", cat: "alkali", config: "[Kr] 5s¹", eShells: [2, 8, 18, 8, 1], en: 0.82, r: 265, ox: [1], state: "solid", desc: "Kim loại kiềm rất hoạt động, bốc cháy tự phát trong không khí ẩm." },
  { z: 38, s: "Sr", nameVi: "Strontium", nameEn: "Strontium", mass: 87.62, period: 5, group: "IIA", groupNum: 2, block: "s", cat: "alkaline", config: "[Kr] 5s²", eShells: [2, 8, 18, 8, 2], en: 0.95, r: 219, ox: [2], state: "solid", desc: "Kim loại kiềm thổ, muối stronti cháy tạo màu đỏ tươi trong pháo hoa." },
  { z: 47, s: "Ag", nameVi: "Silver", nameEn: "Silver", mass: 107.87, period: 5, group: "IB", groupNum: 11, block: "d", cat: "transition", config: "[Kr] 4d¹⁰ 5s¹", eShells: [2, 8, 18, 18, 1], en: 1.93, r: 165, ox: [1], state: "solid", desc: "Kim loại dẫn điện và dẫn nhiệt tốt nhất trong tất cả các kim loại, có tính kháng khuẩn." },
  { z: 50, s: "Sn", nameVi: "Tin", nameEn: "Tin", mass: 118.71, period: 5, group: "IVA", groupNum: 14, block: "p", cat: "post-transition", config: "[Kr] 4d¹⁰ 5s² 5p²", eShells: [2, 8, 18, 18, 4], en: 1.96, r: 145, ox: [2, 4], state: "solid", desc: "Kim loại thiếc màu trắng bạc, dùng tráng lên sắt làm tôn tây và chế tạo đồng thanh." },
  { z: 53, s: "I", nameVi: "Iodine", nameEn: "Iodine", mass: 126.90, period: 5, group: "VIIA", groupNum: 17, block: "p", cat: "halogen", config: "[Kr] 4d¹⁰ 5s² 5p⁵", eShells: [2, 8, 18, 18, 7], en: 2.66, r: 115, ox: [-1, 1, 3, 5, 7], state: "solid", desc: "Halogen thể rắn màu tím đen, dễ thăng hoa khi đun nóng, muối iot giúp phòng bệnh bướu cổ." },
  { z: 54, s: "Xe", nameVi: "Xenon", nameEn: "Xenon", mass: 131.29, period: 5, group: "VIIIA", groupNum: 18, block: "p", cat: "noble", config: "[Kr] 4d¹⁰ 5s² 5p⁶", eShells: [2, 8, 18, 18, 8], en: 2.60, r: 108, ox: [0, 2, 4, 6], state: "gas", desc: "Khí hiếm nặng, có thể tạo một số hợp chất với flo và oxy dưới điều kiện đặc biệt." },
  { z: 55, s: "Cs", nameVi: "Caesium", nameEn: "Caesium", mass: 132.91, period: 6, group: "IA", groupNum: 1, block: "s", cat: "alkali", config: "[Xe] 6s¹", eShells: [2, 8, 18, 18, 8, 1], en: 0.79, r: 298, ox: [1], state: "solid", desc: "Kim loại kiềm có tính kim loại mạnh nhất và độ âm điện nhỏ nhất trong các nguyên tố bền." },
  { z: 56, s: "Ba", nameVi: "Barium", nameEn: "Barium", mass: 137.33, period: 6, group: "IIA", groupNum: 2, block: "s", cat: "alkaline", config: "[Xe] 6s²", eShells: [2, 8, 18, 18, 8, 2], en: 0.89, r: 253, ox: [2], state: "solid", desc: "Kim loại kiềm thổ, muối BaSO₄ không tan trong nước và acid, dùng làm chất cản quang X-quang tiêu hóa." },
  { z: 79, s: "Au", nameVi: "Gold", nameEn: "Gold", mass: 196.97, period: 6, group: "IB", groupNum: 11, block: "d", cat: "transition", config: "[Xe] 4f¹⁴ 5d¹⁰ 6s¹", eShells: [2, 8, 18, 32, 18, 1], en: 2.54, r: 174, ox: [1, 3], state: "solid", desc: "Kim loại quý có tính dẻo nhất (1 gam vàng dát mỏng thành lá rộng 1 m²), không bị oxi hóa trong không khí." },
  { z: 80, s: "Hg", nameVi: "Mercury", nameEn: "Mercury", mass: 200.59, period: 6, group: "IIB", groupNum: 12, block: "d", cat: "transition", config: "[Xe] 4f¹⁴ 5d¹⁰ 6s²", eShells: [2, 8, 18, 32, 18, 2], en: 2.00, r: 171, ox: [1, 2], state: "liquid", desc: "Kim loại duy nhất ở thể lỏng ở nhiệt độ phòng, độc tính cao, dùng trong nhiệt kế thủy ngân cổ điển." },
  { z: 82, s: "Pb", nameVi: "Lead", nameEn: "Lead", mass: 207.2, period: 6, group: "IVA", groupNum: 14, block: "p", cat: "post-transition", config: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p²", eShells: [2, 8, 18, 32, 18, 4], en: 2.33, r: 154, ox: [2, 4], state: "solid", desc: "Kim loại nặng mềm, cản tia X và tia bức xạ phóng xạ rất tốt, dùng làm bình ắc quy chì." },
  { z: 92, s: "U", nameVi: "Uranium", nameEn: "Uranium", mass: 238.03, period: 7, group: "IIIB", groupNum: 3, block: "f", cat: "actinide", config: "[Rn] 5f³ 6d¹ 7s²", eShells: [2, 8, 18, 32, 21, 9, 2], en: 1.38, r: 196, ox: [3, 4, 5, 6], state: "solid", desc: "Nguyên tố phóng xạ tự nhiên nặng nhất, nhiên liệu chính trong các lò phản ứng hạt nhân phát điện." }
];

// 2. DỮ LIỆU CÁC BÀI HỌC VÀ CHƯƠNG LÝ THUYẾT HÓA HỌC 10
const LESSONS_DATA = [
  {
    id: "bai-1",
    chapter: "Chương 1: Cấu tạo nguyên tử",
    title: "Bài 1: Thành phần cấu tạo nguyên tử",
    badge: "Chương 1 · Bài 1",
    summary: "Nguyên tử gồm hạt nhân mang điện dương (proton, neutron) và lớp vỏ mang điện âm (electron). Tìm hiểu điện tích, khối lượng và kích thước nguyên tử.",
    keyFormulas: [
      { name: "Trung hòa điện tích", formula: "p = e = Z \\quad \\text{(Số hiệu nguyên tử)}" },
      { name: "Số khối của hạt nhân", formula: "A = Z + N" },
      { name: "Khối lượng xấp xỉ", formula: "m_{\\text{nguyên tử}} \\approx m_{\\text{hạt nhân}} \\approx A \\text{ (amu)}" }
    ],
    contentHtml: `
      <div class="space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <div class="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800">
          <h4 class="font-bold text-emerald-800 dark:text-emerald-300 text-base mb-2 flex items-center gap-2">
            <span>🔬</span> 1. Khái quát thành phần nguyên tử
          </h4>
          <p class="mb-2">Nguyên tử là hạt vô cùng nhỏ bé và <strong>trung hòa về điện</strong>, gồm hai phần:</p>
          <ul class="list-disc pl-5 space-y-1">
            <li><strong>Hạt nhân:</strong> Nằm ở tâm nguyên tử, gồm các hạt <em>proton (p)</em> mang điện tích dương và <em>neutron (n)</em> không mang điện.</li>
            <li><strong>Lớp vỏ:</strong> Gồm các hạt <em>electron (e)</em> mang điện tích âm, chuyển động xung quanh hạt nhân.</li>
          </ul>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-xs sm:text-sm border-collapse border border-slate-300 dark:border-slate-700 rounded-xl overflow-hidden">
            <thead class="bg-slate-100 dark:bg-slate-800 font-bold text-slate-700 dark:text-slate-200">
              <tr>
                <th class="border border-slate-300 dark:border-slate-700 p-2.5">Hạt</th>
                <th class="border border-slate-300 dark:border-slate-700 p-2.5">Ký hiệu</th>
                <th class="border border-slate-300 dark:border-slate-700 p-2.5">Điện tích quy ước</th>
                <th class="border border-slate-300 dark:border-slate-700 p-2.5">Điện tích thực tế (Coulomb)</th>
                <th class="border border-slate-300 dark:border-slate-700 p-2.5">Khối lượng xấp xỉ</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border border-slate-300 dark:border-slate-700 p-2 font-semibold">Proton</td>
                <td class="border border-slate-300 dark:border-slate-700 p-2 text-center">p</td>
                <td class="border border-slate-300 dark:border-slate-700 p-2 text-center text-emerald-600 dark:text-emerald-400 font-bold">+1</td>
                <td class="border border-slate-300 dark:border-slate-700 p-2">+1.602 × 10⁻¹⁹ C</td>
                <td class="border border-slate-300 dark:border-slate-700 p-2">≈ 1 amu (1.673 × 10⁻²⁷ kg)</td>
              </tr>
              <tr class="bg-slate-50 dark:bg-slate-900/50">
                <td class="border border-slate-300 dark:border-slate-700 p-2 font-semibold">Neutron</td>
                <td class="border border-slate-300 dark:border-slate-700 p-2 text-center">n</td>
                <td class="border border-slate-300 dark:border-slate-700 p-2 text-center text-slate-500 font-bold">0</td>
                <td class="border border-slate-300 dark:border-slate-700 p-2">0 C</td>
                <td class="border border-slate-300 dark:border-slate-700 p-2">≈ 1 amu (1.675 × 10⁻²⁷ kg)</td>
              </tr>
              <tr>
                <td class="border border-slate-300 dark:border-slate-700 p-2 font-semibold">Electron</td>
                <td class="border border-slate-300 dark:border-slate-700 p-2 text-center">e</td>
                <td class="border border-slate-300 dark:border-slate-700 p-2 text-center text-rose-500 font-bold">-1</td>
                <td class="border border-slate-300 dark:border-slate-700 p-2">-1.602 × 10⁻¹⁹ C</td>
                <td class="border border-slate-300 dark:border-slate-700 p-2">≈ 0.00055 amu (9.109 × 10⁻³¹ kg)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="p-4 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
          <h4 class="font-bold text-indigo-600 dark:text-indigo-400 text-sm sm:text-base">📌 Kích thước và Khối lượng nguyên tử</h4>
          <p>• <strong>Kích thước:</strong> Đường kính nguyên tử khoảng $10^{-10}\\text{ m} = 0.1\\text{ nm} = 1\\text{ Å}$, lớn gấp khoảng $10^4 - 10^5$ lần đường kính hạt nhân. Do đó, <strong>nguyên tử có cấu tạo rỗng</strong>.</p>
          <p>• <strong>Khối lượng:</strong> Do khối lượng electron vô cùng nhỏ (chỉ bằng khoảng $1/1836$ khối lượng của proton) nên khối lượng nguyên tử tập trung hầu như hoàn toàn ở hạt nhân: $m_{\\text{nguyên tử}} \\approx m_{\\text{hạt nhân}}$.</p>
        </div>
      </div>
    `
  },
  {
    id: "bai-2",
    chapter: "Chương 1: Cấu tạo nguyên tử",
    title: "Bài 2: Nguyên tố hóa học, Kí hiệu & Đồng vị",
    badge: "Chương 1 · Bài 2",
    summary: "Định nghĩa nguyên tố hóa học, số hiệu nguyên tử Z, số khối A, kí hiệu nguyên tử, khái niệm đồng vị và công thức tính nguyên tử khối trung bình.",
    keyFormulas: [
      { name: "Kí hiệu nguyên tử", formula: "^{A}_{Z}\\text{X}" },
      { name: "Nguyên tử khối trung bình", formula: "\\overline{A} = \\frac{A_1 x_1 + A_2 x_2 + \\dots + A_k x_k}{100}" },
      { name: "Phần trăm khối lượng đồng vị", formula: "\\%m(^{A_1}\\text{X}) = \\frac{a \\cdot A_1 \\cdot x_1\\%}{M_{\\text{hợp chất}}} \\times 100\\%" }
    ],
    contentHtml: `
      <div class="space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <div class="p-4 bg-blue-50 dark:bg-blue-950/40 rounded-2xl border border-blue-200 dark:border-blue-800">
          <h4 class="font-bold text-blue-800 dark:text-blue-300 text-base mb-2">1. Nguyên tố hóa học & Kí hiệu nguyên tử</h4>
          <p class="mb-2"><strong>Nguyên tố hóa học:</strong> Là tập hợp các nguyên tử có cùng <strong>số proton</strong> (cùng số hiệu nguyên tử $Z$).</p>
          <p>Kí hiệu nguyên tử dạng: <span class="font-mono text-base font-bold text-indigo-600 dark:text-indigo-400">^{A}_{Z}X</span>, trong đó:</p>
          <ul class="list-disc pl-5 mt-1 space-y-1">
            <li>$X$: Ký hiệu hóa học của nguyên tố.</li>
            <li>$Z$: Số hiệu nguyên tử (= số proton = số electron = số điện tích hạt nhân).</li>
            <li>$A$: Số khối hạt nhân ($A = Z + N$).</li>
          </ul>
        </div>

        <div class="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800">
          <h4 class="font-bold text-emerald-800 dark:text-emerald-300 text-base mb-2">2. Đồng vị (Isotopes)</h4>
          <p>• Các <strong>đồng vị</strong> của cùng một nguyên tố là những nguyên tử có <strong>cùng số proton ($Z$)</strong>, nhưng <strong>khác nhau về số neutron ($N$)</strong>, do đó có <strong>số khối ($A$) khác nhau</strong>.</p>
          <p class="mt-2"><em>Ví dụ:</em> Nguyên tố Hydrogen có 3 đồng vị: $^{1}_{1}\\text{H}$ (Protium), $^{2}_{1}\\text{H}$ (Deuterium, $\\text{D}$), $^{3}_{1}\\text{H}$ (Tritium, $\\text{T}$).</p>
        </div>

        <div class="p-4 bg-purple-50 dark:bg-purple-950/40 rounded-2xl border border-purple-200 dark:border-purple-800">
          <h4 class="font-bold text-purple-800 dark:text-purple-300 text-base mb-2">3. Nguyên tử khối trung bình</h4>
          <p>Hầu hết các nguyên tố trong tự nhiên là hỗn hợp của nhiều đồng vị. Nguyên tử khối trung bình $\\overline{A}$ được tính theo công thức:</p>
          <p class="text-center font-bold text-indigo-600 dark:text-indigo-300 my-2">
            $$\\overline{A} = \\frac{A_1 x_1 + A_2 x_2 + \\dots + A_k x_k}{100}$$
          </p>
          <p class="text-xs text-slate-500 dark:text-slate-400">(với $A_1, A_2$ là số khối của các đồng vị; $x_1, x_2$ là phần trăm số nguyên tử tương ứng, $x_1 + x_2 + \\dots = 100$).</p>
        </div>
      </div>
    `
  },
  {
    id: "bai-3",
    chapter: "Chương 1: Cấu tạo nguyên tử",
    title: "Bài 3: Cấu trúc vỏ electron, Orbital & Cấu hình electron",
    badge: "Chương 1 · Bài 3",
    summary: "Mô hình hiện đại về orbital nguyên tử (AO s, p, d, f). Thứ tự năng lượng Klechkowski, nguyên lý Pauli, quy tắc Hund. Cách viết cấu hình electron nguyên tử và ion.",
    keyFormulas: [
      { name: "Thứ tự mức năng lượng", formula: "1s < 2s < 2p < 3s < 3p < 4s < 3d < 4p < 5s < 4d < 5p < 6s" },
      { name: "Số e tối đa trong lớp n", formula: "N_{\\text{max}} = 2n^2 \\quad (n \\le 4)" },
      { name: "Cấu hình Cr đặc biệt", formula: "\\text{Cr}(Z=24): [\\text{Ar}] 3d^5 4s^1" },
      { name: "Cấu hình Cu đặc biệt", formula: "\\text{Cu}(Z=29): [\\text{Ar}] 3d^{10} 4s^1" }
    ],
    contentHtml: `
      <div class="space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <div class="p-4 bg-indigo-50 dark:bg-indigo-950/40 rounded-2xl border border-indigo-200 dark:border-indigo-800">
          <h4 class="font-bold text-indigo-800 dark:text-indigo-300 text-base mb-2">1. Mô hình Orbital nguyên tử (Atomic Orbital - AO)</h4>
          <p>• Theo mô hình hiện đại, electron chuyển động rất nhanh quanh hạt nhân không theo quỹ đạo xác định.</p>
          <p>• <strong>AO:</strong> Là khu vực không gian xung quanh hạt nhân mà tại đó xác suất tìm thấy electron là lớn nhất (khoảng 90%).</p>
          <p>• <strong>Hình dạng AO:</strong> AO $s$ có dạng hình cầu; AO $p$ có dạng hình số 8 nổi gồm 3 orbital ($p_x, p_y, p_z$) định hướng theo 3 trục không gian.</p>
        </div>

        <div class="p-4 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <h4 class="font-bold text-cyan-600 dark:text-cyan-400 text-base mb-2">2. Lớp và Phân lớp electron</h4>
          <p>• <strong>Lớp electron ($n = 1, 2, 3, 4...$ tương ứng $K, L, M, N...$):</strong> Gồm các electron có mức năng lượng gần bằng nhau.</p>
          <p>• <strong>Phân lớp electron ($s, p, d, f$):</strong> Gồm các electron có mức năng lượng bằng nhau.</p>
          <p>• <strong>Số electron tối đa:</strong> Phân lớp $s^2, p^6, d^{10}, f^{14}$. Lớp thứ $n$ có tối đa $2n^2$ electron ($n \\le 4$).</p>
        </div>

        <div class="p-4 bg-amber-50 dark:bg-amber-950/40 rounded-2xl border border-amber-200 dark:border-amber-800">
          <h4 class="font-bold text-amber-800 dark:text-amber-300 text-base mb-2">⚠️ 3 Nguyên tắc & Quy tắc viết cấu hình electron</h4>
          <ul class="list-disc pl-5 space-y-2">
            <li><strong>Nguyên lý vững bền (Klechkowski):</strong> Electron điền vào các mức năng lượng từ thấp đến cao: $1s \\to 2s \\to 2p \\to 3s \\to 3p \\to 4s \\to 3d \\to 4p...$</li>
            <li><strong>Nguyên lý Pauli:</strong> Mỗi AO chứa tối đa 2 electron và có chiều tự quay (spin) ngược nhau ($\\uparrow\\downarrow$).</li>
            <li><strong>Quy tắc Hund:</strong> Trong cùng phân lớp, electron phân bố sao cho số electron độc thân là cực đại.</li>
          </ul>
        </div>
      </div>
    `
  },
  {
    id: "bai-4",
    chapter: "Chương 2: Bảng tuần hoàn & Định luật tuần hoàn",
    title: "Bài 4: Cấu tạo Bảng tuần hoàn các nguyên tố hóa học",
    badge: "Chương 2 · Bài 4",
    summary: "Nguyên tắc sắp xếp nguyên tố trong BTH. Cấu tạo ô nguyên tố, 7 chu kỳ, các nhóm A và nhóm B. Phân loại nguyên tố s, p, d, f.",
    keyFormulas: [
      { name: "Số thứ tự ô", formula: "\\text{Số thứ tự ô} = Z = \\text{Số } p = \\text{Số } e" },
      { name: "Số thứ tự chu kỳ", formula: "\\text{Số thứ tự chu kỳ} = \\text{Số lớp electron}" },
      { name: "Số thứ tự nhóm A", formula: "\\text{Số thứ tự nhóm A} = \\text{Số } e \\text{ hóa trị} = \\text{Số } e \\text{ lớp ngoài cùng}" }
    ],
    contentHtml: `
      <div class="space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <div class="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800">
          <h4 class="font-bold text-emerald-800 dark:text-emerald-300 text-base mb-2">1. Ba nguyên tắc sắp xếp trong BTH</h4>
          <ol class="list-decimal pl-5 space-y-1.5">
            <li>Sắp xếp theo chiều <strong>tăng dần của điện tích hạt nhân</strong> ($Z$).</li>
            <li>Các nguyên tố có <strong>cùng số lớp electron</strong> được xếp vào cùng một hàng (<strong>Chu kỳ</strong>).</li>
            <li>Các nguyên tố có <strong>cấu hình electron tương tự nhau</strong> được xếp vào cùng một cột (<strong>Nhóm</strong>).</li>
          </ol>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-4 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            <h5 class="font-bold text-indigo-600 dark:text-indigo-400 mb-2">Chu kỳ (7 chu kỳ)</h5>
            <p>• <strong>Chu kỳ nhỏ:</strong> Chu kỳ 1 (2 nt), CK 2 (8 nt), CK 3 (8 nt).</p>
            <p>• <strong>Chu kỳ lớn:</strong> CK 4 (18 nt), CK 5 (18 nt), CK 6 (32 nt), CK 7 (32 nt).</p>
          </div>
          <div class="p-4 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            <h5 class="font-bold text-indigo-600 dark:text-indigo-400 mb-2">Nhóm (8 nhóm A và 8 nhóm B)</h5>
            <p>• <strong>Nhóm A:</strong> Gồm các nguyên tố $s$ và $p$. Số thứ tự = số e lớp ngoài cùng.</p>
            <p>• <strong>Nhóm B:</strong> Gồm các nguyên tố $d$ và $f$ (kim loại chuyển tiếp).</p>
          </div>
        </div>
      </div>
    `
  },
  {
    id: "bai-5",
    chapter: "Chương 2: Bảng tuần hoàn & Định luật tuần hoàn",
    title: "Bài 5: Xu hướng biến đổi tính chất trong Bảng tuần hoàn",
    badge: "Chương 2 · Bài 5",
    summary: "Quy luật biến đổi tuần hoàn về bán kính nguyên tử và ion, độ âm điện Pauling, năng lượng ion hóa I1, tính kim loại và tính phi kim.",
    keyFormulas: [
      { name: "Trong cùng chu kỳ (Trái -> Phải)", formula: "r \\downarrow, \\quad \\chi \\uparrow, \\quad \\text{Kim loại} \\downarrow, \\quad \\text{Phi kim} \\uparrow" },
      { name: "Trong cùng nhóm A (Trên -> Dưới)", formula: "r \\uparrow, \\quad \\chi \\downarrow, \\quad \\text{Kim loại} \\uparrow, \\quad \\text{Phi kim} \\downarrow" },
      { name: "Bán kính ion đẳng electron", formula: "Z \\uparrow \\implies r \\downarrow: r(\\text{Al}^{3+}) < r(\\text{Mg}^{2+}) < r(\\text{Na}^+) < r(\\text{F}^-) < r(\\text{O}^{2-})" }
    ],
    contentHtml: `
      <div class="space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <div class="overflow-x-auto">
          <table class="w-full text-xs sm:text-sm border-collapse border border-slate-300 dark:border-slate-700 rounded-xl overflow-hidden">
            <thead class="bg-indigo-50 dark:bg-indigo-950 font-bold text-indigo-900 dark:text-indigo-200">
              <tr>
                <th class="border border-slate-300 dark:border-slate-700 p-2.5">Đại lượng / Tính chất</th>
                <th class="border border-slate-300 dark:border-slate-700 p-2.5">Trong 1 Chu kỳ (Trái → Phải)</th>
                <th class="border border-slate-300 dark:border-slate-700 p-2.5">Trong 1 Nhóm A (Trên → Dưới)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border border-slate-300 dark:border-slate-700 p-2 font-semibold">Điện tích hạt nhân ($Z$)</td>
                <td class="border border-slate-300 dark:border-slate-700 p-2 text-center text-emerald-600 font-bold">Tăng dần</td>
                <td class="border border-slate-300 dark:border-slate-700 p-2 text-center text-emerald-600 font-bold">Tăng dần</td>
              </tr>
              <tr class="bg-slate-50 dark:bg-slate-900/50">
                <td class="border border-slate-300 dark:border-slate-700 p-2 font-semibold">Số lớp electron</td>
                <td class="border border-slate-300 dark:border-slate-700 p-2 text-center">Không đổi</td>
                <td class="border border-slate-300 dark:border-slate-700 p-2 text-center text-emerald-600 font-bold">Tăng dần</td>
              </tr>
              <tr>
                <td class="border border-slate-300 dark:border-slate-700 p-2 font-semibold">Bán kính nguyên tử ($r$)</td>
                <td class="border border-slate-300 dark:border-slate-700 p-2 text-center text-rose-500 font-bold">Giảm dần</td>
                <td class="border border-slate-300 dark:border-slate-700 p-2 text-center text-emerald-600 font-bold">Tăng dần</td>
              </tr>
              <tr class="bg-slate-50 dark:bg-slate-900/50">
                <td class="border border-slate-300 dark:border-slate-700 p-2 font-semibold">Độ âm điện ($\\chi$)</td>
                <td class="border border-slate-300 dark:border-slate-700 p-2 text-center text-emerald-600 font-bold">Tăng dần</td>
                <td class="border border-slate-300 dark:border-slate-700 p-2 text-center text-rose-500 font-bold">Giảm dần</td>
              </tr>
              <tr>
                <td class="border border-slate-300 dark:border-slate-700 p-2 font-semibold">Tính Kim loại (Tính khử)</td>
                <td class="border border-slate-300 dark:border-slate-700 p-2 text-center text-rose-500 font-bold">Giảm dần</td>
                <td class="border border-slate-300 dark:border-slate-700 p-2 text-center text-emerald-600 font-bold">Tăng dần</td>
              </tr>
              <tr class="bg-slate-50 dark:bg-slate-900/50">
                <td class="border border-slate-300 dark:border-slate-700 p-2 font-semibold">Tính Phi kim (Tính oxi hóa)</td>
                <td class="border border-slate-300 dark:border-slate-700 p-2 text-center text-emerald-600 font-bold">Tăng dần</td>
                <td class="border border-slate-300 dark:border-slate-700 p-2 text-center text-rose-500 font-bold">Giảm dần</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `
  },
  {
    id: "bai-6",
    chapter: "Chương 2: Bảng tuần hoàn & Định luật tuần hoàn",
    title: "Bài 6: Biến đổi thành phần & Tính chất hợp chất (Oxide, Hydroxide)",
    badge: "Chương 2 · Bài 6",
    summary: "Hóa trị cao nhất với Oxygen và hóa trị trong hợp chất khí với Hydrogen. Quy luật biến đổi tính acid - base của oxide và hydroxide cao nhất.",
    keyFormulas: [
      { name: "Quy tắc tổng hóa trị", formula: "\\text{Hóa trị với O} + \\text{Hóa trị với H} = 8 \\quad (\\text{Phi kim nhóm IVA - VIIA})" },
      { name: "Tính Base của Oxide & Hydroxide", formula: "\\text{Trong chu kỳ: Giảm dần} \\quad | \\quad \\text{Trong nhóm A: Tăng dần}" },
      { name: "Tính Acid của Oxide & Hydroxide", formula: "\\text{Trong chu kỳ: Tăng dần} \\quad | \\quad \\text{Trong nhóm A: Giảm dần}" }
    ],
    contentHtml: `
      <div class="space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <div class="p-4 bg-teal-50 dark:bg-teal-950/40 rounded-2xl border border-teal-200 dark:border-teal-800">
          <h4 class="font-bold text-teal-800 dark:text-teal-300 text-base mb-2">1. Hóa trị cao nhất với Oxygen và Hydrogen</h4>
          <p>• <strong>Hóa trị cao nhất với O:</strong> Bằng số thứ tự nhóm A ($n$).</p>
          <p>• <strong>Hóa trị với H (phi kim nhóm IVA đến VIIA):</strong> Bằng $8 - n$.</p>
          <p><em>Ví dụ:</em> Sulfur (S) thuộc nhóm VIA: Oxide cao nhất là $\\text{SO}_3$ (hóa trị VI); Hợp chất khí với H là $\\text{H}_2\\text{S}$ (hóa trị $8 - 6 = 2$).</p>
        </div>

        <div class="p-4 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <h4 class="font-bold text-indigo-600 dark:text-indigo-400 text-base mb-2">2. Biến đổi tính Acid - Base của Oxide và Hydroxide</h4>
          <p>Trong một chu kỳ, theo chiều tăng của điện tích hạt nhân ($Z$):</p>
          <ul class="list-disc pl-5 mt-1 space-y-1">
            <li>Tính <strong>base</strong> của oxide và hydroxide giảm dần.</li>
            <li>Tính <strong>acid</strong> của oxide và hydroxide tăng dần.</li>
          </ul>
          <div class="mt-3 p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
            <p class="font-semibold text-slate-900 dark:text-slate-100 mb-1">Dãy Hydroxide chu kỳ 3:</p>
            <p>$\\text{NaOH}$ (base mạnh) $\\to \\text{Mg(OH)}_2$ (base yếu) $\\to \\text{Al(OH)}_3$ (lưỡng tính) $\\to \\text{H}_2\\text{SiO}_3$ (acid rất yếu) $\\to \\text{H}_3\\text{PO}_4$ (acid trung bình) $\\to \\text{H}_2\\text{SO}_4$ (acid mạnh) $\\to \\text{HClO}_4$ (acid rất mạnh).</p>
          </div>
        </div>
      </div>
    `
  },
  {
    id: "bai-7",
    chapter: "Chương 2: Bảng tuần hoàn & Định luật tuần hoàn",
    title: "Bài 7: Định luật tuần hoàn & Ý nghĩa Bảng tuần hoàn",
    badge: "Chương 2 · Bài 7",
    summary: "Nội dung định luật tuần hoàn. Mối quan hệ giữa vị trí nguyên tố trong BTH, cấu hình electron và tính chất hóa học cơ bản.",
    keyFormulas: [
      { name: "Mối quan hệ 3 mắt xích", formula: "\\text{Vị trí trong BTH} \\iff \\text{Cấu hình electron} \\iff \\text{Tính chất hóa học}" }
    ],
    contentHtml: `
      <div class="space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <div class="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800">
          <h4 class="font-bold text-emerald-800 dark:text-emerald-300 text-base mb-2">Định luật tuần hoàn</h4>
          <blockquote class="italic border-l-4 border-emerald-500 pl-3 my-2 text-slate-800 dark:text-slate-200">
            "Tính chất của các nguyên tố và đơn chất, cũng như thành phần và tính chất của các hợp chất tạo nên từ các nguyên tố đó biến đổi tuần hoàn theo chiều tăng của điện tích hạt nhân nguyên tử."
          </blockquote>
        </div>

        <div class="p-4 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <h4 class="font-bold text-indigo-600 dark:text-indigo-400 text-base mb-2">Ý nghĩa thực tiễn của Bảng tuần hoàn</h4>
          <ol class="list-decimal pl-5 space-y-2">
            <li><strong>Biết vị trí $\\implies$ Suy ra cấu tạo và tính chất:</strong> Biết $Z$ suy ra số electron, chu kỳ, nhóm $\\implies$ dự đoán là kim loại/phi kim/khí hiếm, công thức oxide cao nhất.</li>
            <li><strong>Biết cấu tạo $\\implies$ Suy ra vị trí trong BTH:</strong> Từ cấu hình electron suy ra chu kỳ (số lớp e), nhóm (số e hóa trị).</li>
            <li><strong>So sánh tính chất:</strong> So sánh bán kính, độ âm điện, tính acid/base giữa các nguyên tố trong cùng chu kỳ hoặc nhóm.</li>
          </ol>
        </div>
      </div>
    `
  },
  {
    id: "bai-8",
    chapter: "Chương 3: Liên kết hóa học (Mở đầu)",
    title: "Bài 8: Quy tắc Octet & Các loại liên kết hóa học cơ bản",
    badge: "Chương 3 · Bài 8",
    summary: "Quy tắc bát tử (Octet), bản chất liên kết ion (lực hút tĩnh điện cation - anion), liên kết cộng hóa trị (cặp e dùng chung), liên kết hydrogen và tương tác van der Waals.",
    keyFormulas: [
      { name: "Quy tắc Octet", formula: "\\text{Nguyên tử có xu hướng đạt 8 electron ở lớp ngoài cùng (như khí hiếm)}" },
      { name: "Hiệu độ âm điện & Bản chất liên kết", formula: "\\Delta\\chi < 0.4: \\text{KHT không phân cực}; \\; 0.4 \\le \\Delta\\chi < 1.7: \\text{KHT phân cực}; \\; \\Delta\\chi \\ge 1.7: \\text{Liên kết ion}" }
    ],
    contentHtml: `
      <div class="space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <div class="p-4 bg-cyan-50 dark:bg-cyan-950/40 rounded-2xl border border-cyan-200 dark:border-cyan-800">
          <h4 class="font-bold text-cyan-800 dark:text-cyan-300 text-base mb-2">1. Quy tắc Octet (Bát tử)</h4>
          <p>Trong quá trình hình thành liên kết hóa học, nguyên tử của các nguyên tố nhóm A có xu hướng nhường, nhận hoặc góp chung electron để đạt được cấu hình electron bền vững của khí hiếm gần kề với <strong>8 electron ở lớp ngoài cùng</strong> (hoặc 2 electron như Helium).</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-4 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            <h5 class="font-bold text-indigo-600 dark:text-indigo-400 mb-2">⚡ Liên kết Ion</h5>
            <p>• Hình thành do <strong>lực hút tĩnh điện</strong> giữa các ion mang điện tích trái dấu (cation kim loại và anion phi kim).</p>
            <p>• <em>Ví dụ:</em> $\\text{Na}^+ + \\text{Cl}^- \\to \\text{NaCl}$.</p>
          </div>
          <div class="p-4 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            <h5 class="font-bold text-indigo-600 dark:text-indigo-400 mb-2">🤝 Liên kết Cộng hóa trị</h5>
            <p>• Hình thành do <strong>một hay nhiều cặp electron dùng chung</strong> giữa hai nguyên tử.</p>
            <p>• Có thể là KHT không phân cực ($\\text{H}_2, \\text{Cl}_2$) hoặc có phân cực ($\\text{HCl}, \\text{H}_2\\text{O}$).</p>
          </div>
        </div>
      </div>
    `
  }
];

// 3. NGÂN HÀNG CÂU HỎI TRẮC NGHIỆM ĐA DẠNG (MCQ, ĐÚNG/SAI, TRẢ LỜI NGẮN)
const QUIZZES_DATA = [
  // --- DẠNG 1: TRẮC NGHIỆM 4 LỰA CHỌN (MCQ) ---
  {
    id: "hoa_mcq_01",
    type: "mcq",
    chapter: "Chương 1",
    level: "NB",
    q: "Hạt cấu tạo nên lớp vỏ của nguyên tử mang điện tích âm là:",
    options: ["Proton", "Neutron", "Electron", "Positron"],
    answer: 2,
    explanation: "Vỏ nguyên tử cấu tạo từ các electron (e) mang điện tích âm (-1e)."
  },
  {
    id: "hoa_mcq_02",
    type: "mcq",
    chapter: "Chương 1",
    level: "NB",
    q: "Hạt nhân của hầu hết các nguyên tử được cấu tạo bởi:",
    options: ["Electron và proton", "Proton và neutron", "Neutron và electron", "Chỉ có proton"],
    answer: 1,
    explanation: "Hạt nhân gồm hạt proton mang điện dương và hạt neutron không mang điện (riêng đồng vị Protium ¹₁H chỉ có 1 proton, không có neutron)."
  },
  {
    id: "hoa_mcq_03",
    type: "mcq",
    chapter: "Chương 1",
    level: "TH",
    q: "Số khối A của hạt nhân nguyên tử được tính bằng công thức nào sau đây?",
    options: ["A = Z - N", "A = 2Z + N", "A = Z + N", "A = Z + 2N"],
    answer: 2,
    explanation: "Số khối A là tổng số hạt proton (Z) và neutron (N) có trong hạt nhân: A = Z + N."
  },
  {
    id: "hoa_mcq_04",
    type: "mcq",
    chapter: "Chương 1",
    level: "TH",
    q: "Cấu hình electron của nguyên tử Sulfur ($Z = 16$) là:",
    options: [
      "1s² 2s² 2p⁶ 3s² 3p⁴",
      "1s² 2s² 2p⁶ 3s² 3p⁶",
      "1s² 2s² 2p⁶ 3s¹ 3p⁵",
      "1s² 2s² 2p⁴ 3s² 3p⁶"
    ],
    answer: 0,
    explanation: "Sulfur có Z = 16. Phân bố mức năng lượng: 1s² 2s² 2p⁶ 3s² 3p⁴ (tổng số e = 16)."
  },
  {
    id: "hoa_mcq_05",
    type: "mcq",
    chapter: "Chương 1",
    level: "VD",
    q: "Cấu hình electron của ion $\\text{Fe}^{3+}$ ($Z = 26$) ở trạng thái cơ bản là:",
    options: [
      "[Ar] 3d⁵",
      "[Ar] 3d⁶",
      "[Ar] 3d³ 4s²",
      "[Ar] 3d⁴ 4s¹"
    ],
    answer: 0,
    explanation: "Cấu hình của Fe (Z=26) là [Ar] 3d⁶ 4s². Khi nhường 3e để tạo Fe³⁺: nhường 2e ở phân lớp 4s và 1e ở phân lớp 3d -> [Ar] 3d⁵ (bán bão hòa bền vững)."
  },
  {
    id: "hoa_mcq_06",
    type: "mcq",
    chapter: "Chương 1",
    level: "VD",
    q: "Cấu hình electron của nguyên tử Chromium ($Z = 24$) ở trạng thái cơ bản là:",
    options: [
      "[Ar] 3d⁴ 4s²",
      "[Ar] 3d⁵ 4s¹",
      "[Ar] 3d⁶ 4s⁰",
      "[Ar] 3d³ 4s² 4p¹"
    ],
    answer: 1,
    explanation: "Chromium (Z=24) có hiện tượng bán bão hòa phân lớp 3d: một electron từ phân lớp 4s chuyển sang phân lớp 3d để đạt cấu hình bán bão hòa [Ar] 3d⁵ 4s¹ bền vững hơn."
  },
  {
    id: "hoa_mcq_07",
    type: "mcq",
    chapter: "Chương 2",
    level: "NB",
    q: "Bảng tuần hoàn các nguyên tố hóa học hiện đại được sắp xếp theo chiều tăng dần của:",
    options: ["Khối lượng nguyên tử", "Số khối", "Điện tích hạt nhân", "Số neutron"],
    answer: 2,
    explanation: "Nguyên tắc số 1 của BTH hiện đại: Các nguyên tố được sắp xếp theo chiều tăng dần của điện tích hạt nhân nguyên tử (Z)."
  },
  {
    id: "hoa_mcq_08",
    type: "mcq",
    chapter: "Chương 2",
    level: "TH",
    q: "Nguyên tố Aluminium ($Z = 13$) nằm ở vị trí nào trong Bảng tuần hoàn?",
    options: [
      "Ô 13, Chu kỳ 3, Nhóm IIIA",
      "Ô 13, Chu kỳ 3, Nhóm IIIB",
      "Ô 13, Chu kỳ 2, Nhóm IIIA",
      "Ô 13, Chu kỳ 4, Nhóm IIIA"
    ],
    answer: 0,
    explanation: "Al (Z=13): 1s² 2s² 2p⁶ 3s² 3p¹. Z=13 -> Ô 13; 3 lớp e -> Chu kỳ 3; 3e lớp ngoài cùng phân lớp p -> Nhóm IIIA."
  },
  {
    id: "hoa_mcq_09",
    type: "mcq",
    chapter: "Chương 2",
    level: "VD",
    q: "Dãy nguyên tố nào sau đây được sắp xếp theo chiều TĂNG DẦN bán kính nguyên tử?",
    options: [
      "F < Cl < Br < I",
      "I < Br < Cl < F",
      "Na < Mg < Al < Si",
      "K < Na < Li < H"
    ],
    answer: 0,
    explanation: "F, Cl, Br, I thuộc cùng nhóm VIIA. Trong cùng một nhóm A, theo chiều từ trên xuống dưới số lớp e tăng dần -> bán kính nguyên tử tăng dần: F < Cl < Br < I."
  },
  {
    id: "hoa_mcq_10",
    type: "mcq",
    chapter: "Chương 2",
    level: "VD",
    q: "Dãy các oxide nào sau đây sắp xếp theo chiều TĂNG DẦN tính acid?",
    options: [
      "Na₂O < MgO < Al₂O₃ < SiO₂ < P₂O₅ < SO₃ < Cl₂O₇",
      "Cl₂O₇ < SO₃ < P₂O₅ < SiO₂ < Al₂O₃ < MgO < Na₂O",
      "Al₂O₃ < SiO₂ < Na₂O < MgO < SO₃ < P₂O₅ < Cl₂O₇",
      "SO₃ < P₂O₅ < Cl₂O₇ < SiO₂ < Al₂O₃ < MgO < Na₂O"
    ],
    answer: 0,
    explanation: "Các nguyên tố trên cùng thuộc Chu kỳ 3. Theo chiều từ trái sang phải, tính kim loại giảm và tính phi kim tăng dần -> tính acid của oxide cao nhất tăng dần từ Na₂O (basic oxide) đến Cl₂O₇ (acidic oxide rất mạnh)."
  },
  {
    id: "hoa_mcq_11",
    type: "mcq",
    chapter: "Chương 2",
    level: "VDC",
    q: "Cho các ion cùng số electron: O²⁻ (Z=8), F⁻ (Z=9), Na⁺ (Z=11), Mg²⁺ (Z=12), Al³⁺ (Z=13). Thứ tự GIẢM DẦN của bán kính ion là:",
    options: [
      "r(O²⁻) > r(F⁻) > r(Na⁺) > r(Mg²⁺) > r(Al³⁺)",
      "r(Al³⁺) > r(Mg²⁺) > r(Na⁺) > r(F⁻) > r(O²⁻)",
      "r(Na⁺) > r(Mg²⁺) > r(Al³⁺) > r(O²⁻) > r(F⁻)",
      "r(F⁻) > r(O²⁻) > r(Na⁺) > r(Mg²⁺) > r(Al³⁺)"
    ],
    answer: 0,
    explanation: "Các ion đều có 10e (cấu hình Ne). Càng nhiều proton Z thì hạt nhân hút các electron lớp ngoài càng mạnh làm bán kính càng co lại -> Z nhỏ nhất (O: 8) có bán kính lớn nhất; Z lớn nhất (Al: 13) có bán kính nhỏ nhất."
  },
  {
    id: "hoa_mcq_12",
    type: "mcq",
    chapter: "Chương 3",
    level: "TH",
    q: "Liên kết trong phân tử sodium chloride (NaCl) là loại liên kết nào?",
    options: [
      "Liên kết ion",
      "Liên kết cộng hóa trị không phân cực",
      "Liên kết cộng hóa trị có phân cực",
      "Liên kết hydrogen"
    ],
    answer: 0,
    explanation: "NaCl tạo bởi kim loại điển hình Na và phi kim điển hình Cl. Hiệu độ âm điện Δχ = 3.16 - 0.93 = 2.23 ≥ 1.7 -> Bản chất là liên kết ion hình thành do lực hút tĩnh điện giữa Na⁺ và Cl⁻."
  },

  // --- DẠNG 2: TRẮC NGHIỆM ĐÚNG / SAI (ĐỀ MỚI 2025) ---
  {
    id: "hoa_tf_01",
    type: "tf",
    chapter: "Chương 1",
    level: "TH",
    q: "Cho nguyên tử nguyên tố Phosphorus có số hiệu nguyên tử $Z = 15$. Xét tính đúng/sai của các mệnh đề sau:",
    subQuestions: [
      { text: "Hạt nhân nguyên tử Phosphorus có 15 proton và lớp vỏ có 15 electron.", answer: true, exp: "Đúng, nguyên tử trung hòa điện nên số p = số e = Z = 15." },
      { text: "Cấu hình electron của Phosphorus là 1s² 2s² 2p⁶ 3s² 3p³.", answer: true, exp: "Đúng, tổng 15 electron được điền theo thứ tự mức năng lượng." },
      { text: "Vỏ nguyên tử Phosphorus có 5 lớp electron.", answer: false, exp: "Sai, chỉ có 3 lớp electron (n = 1, 2, 3)." },
      { text: "Ở trạng thái cơ bản, nguyên tử Phosphorus có 3 electron độc thân.", answer: true, exp: "Đúng, phân lớp 3p³ có 3 orbital p mỗi orbital chứa 1e độc thân theo quy tắc Hund." }
    ]
  },
  {
    id: "hoa_tf_02",
    type: "tf",
    chapter: "Chương 2",
    level: "VD",
    q: "Cho các nguyên tố thuộc Chu kỳ 3 gồm: Na (Z=11), Mg (Z=12), Al (Z=13), Si (Z=14), P (Z=15), S (Z=16), Cl (Z=17). Xét tính đúng/sai của các phát biểu sau:",
    subQuestions: [
      { text: "Sodium (Na) là nguyên tố có bán kính nguyên tử lớn nhất trong chu kỳ 3.", answer: true, exp: "Đúng, từ trái sang phải trong chu kỳ, bán kính nguyên tử giảm dần nên Na lớn nhất." },
      { text: "Chlorine (Cl) là nguyên tố có độ âm điện lớn nhất trong chu kỳ 3.", answer: true, exp: "Đúng, từ trái sang phải trong chu kỳ độ âm điện tăng dần nên Cl lớn nhất." },
      { text: "Công thức oxide cao nhất của Phosphorus là P₂O₃.", answer: false, exp: "Sai, P thuộc nhóm VA nên oxide cao nhất có công thức là P₂O₅." },
      { text: "Tính base của NaOH mạnh hơn dung dịch Mg(OH)₂.", answer: true, exp: "Đúng, trong chu kỳ từ trái sang phải tính base của hydroxide giảm dần: NaOH > Mg(OH)₂." }
    ]
  },
  {
    id: "hoa_tf_03",
    type: "tf",
    chapter: "Chương 1",
    level: "VD",
    q: "Trong tự nhiên, Chlorine có hai đồng vị bền là ³⁵Cl (chiếm 75.77%) và ³⁷Cl (chiếm 24.23%). Xét các khẳng định sau:",
    subQuestions: [
      { text: "Hai đồng vị ³⁵Cl và ³⁷Cl có cùng số neutron nhưng khác số proton.", answer: false, exp: "Sai, đồng vị có cùng số proton (17) nhưng khác số neutron (18 và 20)." },
      { text: "Nguyên tử khối trung bình của Chlorine xấp xỉ bằng 35.5.", answer: true, exp: "Đúng, A = (35*75.77 + 37*24.23)/100 = 35.4846 ≈ 35.5." },
      { text: "Trong 1 mol khí Cl₂ có chứa đúng 1 mol nguyên tử ³⁵Cl.", answer: false, exp: "Sai, trong 1 mol Cl₂ có 2 mol Cl, trong đó số mol ³⁵Cl là 2 * 75.77% = 1.5154 mol." },
      { text: "Thành phần phần trăm khối lượng của đồng vị ³⁵Cl trong muối KClO₃ xấp xỉ 21.65%.", answer: true, exp: "Đúng, %m(³⁵Cl) = (35 * 75.77%) / (39 + 35.485 + 48) * 100% ≈ 21.65%." }
    ]
  },

  // --- DẠNG 3: TRẢ LỜI NGẮN / ĐIỀN SỐ (ĐỀ MỚI 2025) ---
  {
    id: "hoa_sa_01",
    type: "sa",
    chapter: "Chương 1",
    level: "TH",
    q: "Nguyên tử của nguyên tố Calcium ($Z = 20$). Số electron ở lớp ngoài cùng của Calcium là bao nhiêu?",
    answer: "2",
    explanation: "Cấu hình e của Ca (Z=20) là 1s² 2s² 2p⁶ 3s² 3p⁶ 4s². Lớp ngoài cùng (lớp thứ 4) có đúng 2 electron."
  },
  {
    id: "hoa_sa_02",
    type: "sa",
    chapter: "Chương 1",
    level: "VD",
    q: "Một nguyên tử $X$ có tổng số hạt cơ bản ($p, n, e$) là 40. Trong đó số hạt mang điện nhiều hơn số hạt không mang điện là 12. Số hiệu nguyên tử $Z$ của $X$ là bao nhiêu?",
    answer: "13",
    explanation: "Hệ phương trình: 2Z + N = 40 và 2Z - N = 12. Cộng vế theo vế: 4Z = 52 -> Z = 13 (Aluminium)."
  },
  {
    id: "hoa_sa_03",
    type: "sa",
    chapter: "Chương 1",
    level: "VD",
    q: "Trong tự nhiên, nguyên tố Boron có 2 đồng vị là ¹⁰B và ¹¹B. Nguyên tử khối trung bình của Boron là 10.81. Phần trăm số nguyên tử của đồng vị ¹¹B là bao nhiêu %? (chỉ nhập số)",
    answer: "81",
    explanation: "Ta có: [10*x + 11*(100-x)]/100 = 10.81 -> 1100 - x = 1081 -> x = 19% (của ¹⁰B) -> %¹¹B = 100 - 19 = 81%."
  },
  {
    id: "hoa_sa_04",
    type: "sa",
    chapter: "Chương 2",
    level: "TH",
    q: "Nguyên tố Sulfur ($Z = 16$) nằm ở nhóm VIA trong Bảng tuần hoàn. Hóa trị cao nhất của Sulfur với Oxygen là bao nhiêu?",
    answer: "6",
    explanation: "Sulfur thuộc nhóm VIA nên hóa trị cao nhất với Oxygen bằng số thứ tự nhóm A = 6 (công thức oxide cao nhất là SO₃)."
  },
  {
    id: "hoa_sa_05",
    type: "sa",
    chapter: "Chương 2",
    level: "VDC",
    q: "Hai nguyên tố $A$ và $B$ đứng kế tiếp nhau trong cùng một nhóm A của BTH và thuộc 2 chu kỳ nhỏ liên tiếp (CK 2 và 3). Tổng số proton trong hai hạt nhân là 24. Số hiệu nguyên tử của nguyên tố $B$ (với $Z_B > Z_A$) là bao nhiêu?",
    answer: "16",
    explanation: "Hai chu kỳ nhỏ liên tiếp cùng nhóm A hơn kém nhau 8 proton: Z_B - Z_A = 8 và Z_A + Z_B = 24 -> Z_B = (24 + 8) / 2 = 16 (Sulfur), Z_A = 8 (Oxygen)."
  }
];

// 4. BÀI TẬP TỰ LUẬN CHỌN LỌC CÓ LỜI GIẢI VÀ BAREM CHẤM ĐIỂM
const ESSAY_DATA = [
  {
    id: "essay_01",
    chapter: "Chương 1: Cấu tạo nguyên tử",
    title: "Bài toán hệ hạt trong phân tử hợp chất $M_2X$",
    problem: "Hợp chất $M_2X$ có tổng số hạt cơ bản ($p, n, e$) cấu tạo nên phân tử là 140 hạt, trong đó số hạt mang điện nhiều hơn số hạt không mang điện là 44 hạt. Số khối của nguyên tử $M$ lớn hơn số khối của nguyên tử $X$ là 23. Tổng số hạt trong nguyên tử $M$ nhiều hơn trong nguyên tử $X$ là 34 hạt.\\n1. Xác định số hiệu nguyên tử $Z_M, Z_X$ và số khối $A_M, A_X$.\\n2. Viết cấu hình electron của $M$ và $X$. Xác định công thức phân tử của hợp chất $M_2X$.",
    solution: `
      <div class="space-y-3 text-slate-700 dark:text-slate-300">
        <p><strong>1. Thiết lập hệ phương trình:</strong></p>
        <p>• Trong phân tử $M_2X$, tổng số hạt là: $2(2Z_M + N_M) + (2Z_X + N_X) = 140 \\quad (1)$</p>
        <p>• Số hạt mang điện nhiều hơn không mang điện là 44:</p>
        <p class="pl-4">$(4Z_M + 2Z_X) - (2N_M + N_X) = 44 \\quad (2)$</p>
        <p>• Lấy $(1) + (2) \\implies 2(4Z_M + 2Z_X) = 184 \\implies 2Z_M + Z_X = 46 \\quad (3)$</p>
        <p>• Theo đề bài: Tổng số hạt $M$ hơn $X$ là 34: $(2Z_M + N_M) - (2Z_X + N_X) = 34 \\quad (4)$</p>
        <p>• Số khối $M$ hơn $X$ là 23: $(Z_M + N_M) - (Z_X + N_X) = 23 \\quad (5)$</p>
        <p>• Lấy $(4) - (5) \\implies Z_M - Z_X = 11 \\quad (6)$</p>
        <p><strong>2. Giải hệ phương trình:</strong></p>
        <p>Từ (3) và (6): $2Z_M + Z_X = 46$ và $Z_M - Z_X = 11 \\implies 3Z_M = 57 \\implies Z_M = 19 \\implies Z_X = 8$.</p>
        <p>Thay $Z$ vào tìm được: $N_X = 8, N_M = 20 \\implies A_M = 19 + 20 = 39; A_X = 8 + 8 = 16$.</p>
        <p><strong>3. Cấu hình electron & Công thức phân tử:</strong></p>
        <p>• $M (Z=19)$: $1s^2 2s^2 2p^6 3s^2 3p^6 4s^1$ (Potassium - K).</p>
        <p>• $X (Z=8)$: $1s^2 2s^2 2p^4$ (Oxygen - O).</p>
        <p>• Công thức phân tử của hợp chất là: <strong>K₂O</strong> (Potassium oxide).</p>
      </div>
    `
  },
  {
    id: "essay_02",
    chapter: "Chương 2: Bảng tuần hoàn",
    title: "Xác định 2 nguyên tố cùng nhóm A & So sánh tính chất",
    problem: "Hai nguyên tố $A$ và $B$ thuộc cùng một phân nhóm chính (nhóm A) và ở hai chu kỳ liên tiếp trong Bảng tuần hoàn. Tổng số hạt proton trong hai hạt nhân nguyên tử $A$ và $B$ là 32.\\n1. Xác định số hiệu nguyên tử và tên của hai nguyên tố $A$ và $B$.\\n2. Viết cấu hình electron của $A$ và $B$, xác định vị trí của chúng trong BTH (ô, chu kỳ, nhóm).\\n3. So sánh tính kim loại và tính base của hydroxide tương ứng của $A$ và $B$.",
    solution: `
      <div class="space-y-3 text-slate-700 dark:text-slate-300">
        <p><strong>1. Xác định $Z_A$ và $Z_B$:</strong></p>
        <p>• Ta có $Z_A + Z_B = 32 \\implies \\overline{Z} = 16$.</p>
        <p>• Vì $A, B$ cùng nhóm A ở hai chu kỳ liên tiếp nên hiệu số proton giữa chúng là 8 (chu kỳ nhỏ) hoặc 18 (chu kỳ lớn).</p>
        <p>• Xét TH1: $Z_B - Z_A = 8 \\implies Z_A = 12$ (Magnesium - Mg) và $Z_B = 20$ (Calcium - Ca). (Thỏa mãn hai chu kỳ 3 và 4 liên tiếp cùng nhóm IIA).</p>
        <p>• Xét TH2: $Z_B - Z_A = 18 \\implies Z_A = 7$ (N, nhóm VA) và $Z_B = 25$ (Mn, nhóm VIIB - loại vì không cùng nhóm A).</p>
        <p><strong>2. Cấu hình electron và vị trí:</strong></p>
        <p>• $\\text{Mg} (Z=12)$: $1s^2 2s^2 2p^6 3s^2 \\implies$ Ô số 12, Chu kỳ 3, Nhóm IIA.</p>
        <p>• $\\text{Ca} (Z=20)$: $1s^2 2s^2 2p^6 3s^2 3p^6 4s^2 \\implies$ Ô số 20, Chu kỳ 4, Nhóm IIA.</p>
        <p><strong>3. So sánh tính chất:</strong></p>
        <p>• Cùng nhóm IIA, theo chiều từ trên xuống dưới ($Z$ tăng): Tính kim loại tăng dần $\\implies \\text{Tính kim loại: } \\text{Mg} < \\text{Ca}$.</p>
        <p>• Tính base của hydroxide tăng dần: $\\text{Mg(OH)}_2 < \\text{Ca(OH)}_2$ ($\\text{Mg(OH)}_2$ là base yếu kết tủa trắng, $\\text{Ca(OH)}_2$ là base mạnh tan ít).</p>
      </div>
    `
  }
];

// 5. CÔNG THỨC TOÀN CHƯƠNG & BẢNG TRA CỨU
const FORMULAS_DATA = [
  {
    category: "Cấu tạo nguyên tử",
    items: [
      { name: "Số khối hạt nhân", formula: "A = Z + N", note: "Z: số proton (= số e); N: số neutron" },
      { name: "Khối lượng xấp xỉ của nguyên tử", formula: "m_{\\text{nguyên tử}} \\approx m_{\\text{hạt nhân}} \\approx A \\text{ (amu)}", note: "1 amu ≈ 1.6605 × 10⁻²⁷ kg" },
      { name: "Nguyên tử khối trung bình", formula: "\\overline{A} = \\frac{A_1 x_1 + A_2 x_2 + \\dots + A_k x_k}{100}", note: "x_k là phần trăm số nguyên tử của đồng vị thứ k" },
      { name: "Hệ thức chặn tỉ lệ neutron/proton", formula: "1 \\le \\frac{N}{Z} \\le 1.5 \\iff \\frac{S}{3.5} \\le Z \\le \\frac{S}{3}", note: "Áp dụng với các nguyên tố bền có Z ≤ 82, S = 2Z + N" },
      { name: "Số electron tối đa trong lớp n", formula: "N_{\\text{max}} = 2n^2", note: "Áp dụng với n ≤ 4 (K=2, L=8, M=18, N=32)" }
    ]
  },
  {
    category: "Bảng tuần hoàn & Định luật tuần hoàn",
    items: [
      { name: "Xác định ô nguyên tố", formula: "\\text{Số thứ tự ô} = Z = \\text{Số proton} = \\text{Số electron}", note: "Điện tích hạt nhân bằng +Z" },
      { name: "Xác định chu kỳ", formula: "\\text{Số thứ tự chu kỳ} = \\text{Số lớp electron}", note: "BTH có 7 chu kỳ (3 chu kỳ nhỏ, 4 chu kỳ lớn)" },
      { name: "Xác định nhóm A", formula: "\\text{Số thứ tự nhóm A} = \\text{Số electron lớp ngoài cùng}", note: "Nguyên tố s và p" },
      { name: "Hóa trị cao nhất với Oxygen", formula: "\\text{Hóa trị cao nhất với O} = n \\text{ (Số thứ tự nhóm A)}", note: "Công thức oxide cao nhất: R₂Oₙ hoặc RO_{n/2}" },
      { name: "Hóa trị với Hydrogen", formula: "\\text{Hóa trị với H} = 8 - n \\quad (4 \\le n \\le 7)", note: "Áp dụng cho phi kim từ nhóm IVA đến VIIA" }
    ]
  },
  {
    category: "Liên kết hóa học",
    items: [
      { name: "Hiệu độ âm điện & Bản chất liên kết", formula: "\\Delta\\chi = \\chi_B - \\chi_A", note: "Δχ < 0.4: KHT không cực; 0.4 ≤ Δχ < 1.7: KHT có cực; Δχ ≥ 1.7: Liên kết ion" },
      { name: "Quy tắc Octet (Bát tử)", formula: "ns^2 np^6 \\quad \\text{(Đạt 8e lớp ngoài cùng như khí hiếm)}", note: "Ngoại trừ Helium đạt 2e (1s²)" }
    ]
  }
];
