import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Container } from "@mui/material";
import './DieuTri.scss'
function createData(
  disease,
  precaution_1,
  precaution_2,
  precaution_3,
  precaution_4
) {
  return { disease, precaution_1, precaution_2, precaution_3, precaution_4 };
}

function preCreateData(disease) {
  console.log("preCreateData: ", disease.length);
  let list_disease = [];
  for (let i = 0; i < disease.length; i++) {
    // console.log(createData(disease[i][0], disease[i][1], disease[i][2], disease[i][3], disease[i][4]))
    list_disease.push(
      createData(
        disease[i][0],
        disease[i][1],
        disease[i][2],
        disease[i][3],
        disease[i][4]
      )
    );
  }
  return list_disease;
}

let disease = [
  [
    "phản ứng thuốc",
    "ngừng dùng chất kích thích",
    "đến bệnh viện gần nhất",
    "ngừng dùng thuốc",
    "theo dõi tình trạng bản thân",
  ],
  [
    "bệnh sốt rét",
    "đến bệnh viện gần nhất",
    "tránh thức ăn nhờn",
    "dùng thức ăn có chất sơ",
    "không để muỗi đốt",
  ],
  [
    "dị ứng",
    "dùng thuốc calamine",
    "băng nén ngứa",
    "hạn chế gãi vết ngứa",
    " ",
  ],
  [
    "suy giáp",
    "giảm căng thẳng",
    "tập thể dục",
    "ăn uống lành mạnh",
    "ăn ngủ điều độ",
  ],
  [
    "vẩy nến",
    "rửa tay bằng nước xà phòng ấm",
    "ngừng chảy máu bằng áp lực",
    "lắng nghe ý kiến bác sĩ",
    "tắm nước muối",
  ],
  [
    "trào ngược dạ dày thực quản",
    "tránh thức ăn cay béo",
    "tránh nằm xuống sau khi ăn",
    "duy trì cân nặng khỏe mạnh",
    "tập thể dục",
  ],
  [
    "ứ mật mãn tính",
    "tắm lạnh",
    "dùng thuốc chống ngứa",
    "lắng nghe ý kiến bác sĩ",
    "ăn uống lành mạnh",
  ],
  [
    "viêm gan A",
    "đến bệnh viện gần nhất",
    "rửa tay thường xuyên",
    "tránh thức ăn cay béo",
    "dùng thuốc đặc trị",
  ],
  [
    "viêm xương khớp",
    "acetaminophen",
    "đến bệnh viện gần nhất",
    "theo dõi tình trạng bản thân",
    "tắm nước muối",
  ],
  [
    "chóng mặt do tư thế",
    "nằm xuống",
    "tránh thay đổi đột ngột trong cơ thể",
    "tránh di chuyển đầu đột ngột",
    "thư giãn",
  ],
  [
    "hạ đường huyết",
    "nằm xuống",
    "uống đồ uống có đường",
    "lắng nghe ý kiến bác sĩ",
    " ",
  ],
  [
    "mụn",
    "tắm kỹ",
    "tránh thức ăn cay béo",
    "uống nhiều nước",
    "tránh sử dụng nhiều mỹ phẩm",
  ],
  [
    "bệnh tiểu đường",
    "có chế độ ăn uống cân bằng",
    "tập thể dục",
    "lắng nghe ý kiến bác sĩ",
    "theo dõi tình trạng bản thân",
  ],
  [
    "bệnh chốc lở",
    "ngâm khu vực bị ảnh hưởng trong nước ấm",
    "sử dụng kháng sinh",
    "loại bỏ các vảy bằng khăn ướt",
    "lắng nghe ý kiến bác sĩ",
  ],
  [
    "tăng huyết áp",
    "ngồi thiền",
    "tắm nước muối",
    "giảm căng thẳng",
    "ăn ngủ điều độ",
  ],
  [
    "loét dạ dày tá tràng",
    "tránh thức ăn cay béo",
    "ăn uống thực phẩm sinh học",
    "ngừng uống sữa",
    "hạn chế dùng rượu bia",
  ],
  [
    "bệnh trĩ",
    "tránh thức ăn cay béo",
    "uống thuốc hazel",
    "tắm ấm với muối epsom",
    "uống nước ép alovera",
  ],
  [
    "cảm lạnh thông thường",
    "uống đồ uống giàu vitamin c",
    "hít thở đều",
    "tránh thức ăn lạnh",
    "chuẩn bị trước thuốc hạ sốt",
  ],
  [
    "thủy đậu",
    "nấu lá neem để tắm",
    "tiêm vắc -xin",
    "tránh những nơi công cộng",
  ],
  [
    "thoái hóa đốt sống cổ",
    "sử dụng miếng đệm sưởi hoặc gói lạnh",
    "tập thể dục",
    "uống otc pain reliver",
    "lắng nghe ý kiến bác sĩ",
  ],
  [
    "cường giáp",
    "ăn uống lành mạnh",
    "mát xa",
    "sử dụng balm chanh",
    "điều trị bằng iốt phóng xạ",
  ],
  [
    "nhiễm trùng đường tiết niệu",
    "uống nhiều nước",
    "tăng lượng vitamin c",
    "uống nước ép nam việt quất",
    "uống men vi sinh",
  ],
  [
    "suy tĩnh mạch",
    "nằm xuống bằng phẳng và nâng chân cao",
    "sử dụng oinment",
    "sử dụng nén tĩnh mạch",
    "hạn chế đứng yên lâu",
  ],
  [
    "AIDS",
    "sử dụng thuốc đặc trị",
    "mặc đồ bảo hộ nếu có thể",
    "lắng nghe ý kiến bác sĩ",
    "theo dõi tình trạng bản thân",
  ],
  [
    "tê liệt (xuất huyết não)",
    "mát xa",
    "ăn uống lành mạnh",
    "tập thể dục",
    "lắng nghe ý kiến bác sĩ",
  ],
  [
    "bệnh thương hàn",
    "ăn nhiều rau củ quả",
    "liệu pháp kháng sinh",
    "lắng nghe ý kiến bác sĩ",
    "sử dụng thuốc đặc trị",
  ],
  [
    "viêm gan B",
    "đến bệnh viện gần nhất",
    "tiêm chủng",
    "ăn uống lành mạnh",
    "sử dụng thuốc đặc trị",
  ],
  [
    "nhiễm trùng nấm",
    "tắm kỹ",
    "sử dụng detol hoặc neem trong nước tắm",
    "giữ cho khu vực bị nhiễm khô",
    "sử dụng vải sạch",
  ],
  [
    "viêm gan C",
    "đến bệnh viện gần nhất",
    "tiêm chủng",
    "ăn uống lành mạnh",
    "sử dụng thuốc đặc trị",
  ],
  [
    "đau nửa đầu",
    "ngồi thiền",
    "giảm căng thẳng",
    "sử dụng kính poloroid trong ánh nắng mặt trời",
    "lắng nghe ý kiến bác sĩ",
  ],
  [
    "hen phế quản",
    "chuyển sang cảm ứng lỏng lẻo",
    "hít thở sâu",
    "tránh xa kích hoạt",
    "tìm kiếm sự giúp đỡ",
  ],
  [
    "viêm gan do rượu",
    "ngừng sử dụng rượu bia",
    "lắng nghe ý kiến bác sĩ",
    "sử dụng thuốc đặc trị",
    "theo dõi tình trạng bản thân",
  ],
  [
    "bệnh vàng da",
    "uống nhiều nước",
    "ăn trái cây và thức ăn nhiều chất xơ",
    "sử dụng thuốc đặc trị",
  ],
  [
    "viêm gan E",
    "ngừng sử dụng rượu bia",
    "nghỉ ngơi",
    "lắng nghe ý kiến bác sĩ",
    "sử dụng thuốc đặc trị",
  ],
  [
    "sốt xuất huyết",
    "uống nước đu đủ",
    "tránh thức ăn cay béo",
    "phòng chống muỗi",
    "giữ nước",
  ],
  [
    "viêm gan D",
    "lắng nghe ý kiến bác sĩ",
    "sử dụng thuốc đặc trị",
    "ăn uống lành mạnh",
    "theo dõi tình trạng bản thân",
  ],
  [
    "đau tim",
    "gọi xe cứu thương",
    "nhai hoặc nuốt asprin",
    "giữ bình tĩnh",
    " ",
  ],
  [
    "viêm phổi",
    "lắng nghe ý kiến bác sĩ",
    "sử dụng thuốc đặc trị",
    "nghỉ ngơi",
    "theo dõi tình trạng bản thân",
  ],
  [
    "viêm khớp",
    "tập thể dục",
    "sử dụng liệu pháp nóng và lạnh",
    "châm cứu",
    "mát xa",
  ],
  [
    "viêm đường tiêu hóa",
    "ngừng ăn thức ăn đặc",
    "uống những ngụm nước nhỏ",
    "nghỉ ngơi",
    "ăn uống điều độ",
  ],
  [
    "bệnh lao",
    "đeo khẩu trang",
    "lắng nghe ý kiến bác sĩ",
    "sử dụng thuốc đặc trị",
    "nghỉ ngơi",
  ],
];

let rows = preCreateData(disease);

export default function DieuTri() {
  return (
    <Container
    className="dieutri-tab"
      maxWidth={"lg"}
      style={{
        margin: "auto",
        marginTop: "130px",
        fontSize: "14px",
      }}
    >
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
          <caption style={{fontSize: '12px'}}>
            Trên đây là những phương pháp điều trị thông dụng, để chắc chắn về
            tình trạng của bệnh, bạn hãy đến trung tâm Y tế gần nhất để đảm bảo
            an toàn cho bản thân mình
          </caption>
          <TableHead>
            <TableRow style={{ backgroundColor: "black" }}>
              <TableCell style={{ color: "white !important" }}>
                TÊN BỆNH
              </TableCell>
              <TableCell style={{ color: "white !important" }} align="right">
                CÁCH ĐIỀU TRỊ
              </TableCell>
              <TableCell style={{ color: "white !important" }} align="right">
                CÁCH ĐIỀU TRỊ
              </TableCell>
              <TableCell style={{ color: "white !important" }} align="right">
                CÁCH ĐIỀU TRỊ
              </TableCell>
              <TableCell style={{ color: "white !important" }} align="right">
                CÁCH ĐIỀU TRỊ
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row) => (
              <TableRow key={row?.disease}>
                <TableCell component="th" scope="row">
                  {row?.disease}
                </TableCell>
                <TableCell align="right">{row?.precaution_1}</TableCell>
                <TableCell align="right">{row?.precaution_2}</TableCell>
                <TableCell align="right">{row?.precaution_3}</TableCell>
                <TableCell align="right">{row?.precaution_4}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
