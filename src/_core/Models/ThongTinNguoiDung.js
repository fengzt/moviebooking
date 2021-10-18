
class LoaiNguoiDung {
  maLoaiNguoiDung = "";
  tenLoai = "";
}

class ThongTinGhe {
  danhSachGhe = [];
  maVe = "";
  ngayDat = "";
  tenPhim = "";
  hinhAnh = "";
  giaVe = 0;
  thoiLuongPhim = 0;
}

class NguoiDung {
  taiKhoan = "";
  matKhau = "";
  hoTen = "";
  email = "";
  soDT = "";
  maNhom = "";
  maLoaiNguoiDung = "";
  loaiNguoiDung = new LoaiNguoiDung();
  thongTinDatVe = [new ThongTinGhe()];
}

export class ThongTinNguoiDung {
  nguoiDung = new NguoiDung();
}

/*
{
    "taiKhoan": "beoxinhgai",
    "matKhau": "beoxinhgai",
    "hoTen": "Nguyễn Thị Bẻo",
    "email": "beoxinhgai@gmail.com",
    "soDT": "0397555192",
    "maNhom": "GP10",
    "maLoaiNguoiDung": "KhachHang",
    "loaiNguoiDung": {
      "maLoaiNguoiDung": "KhachHang",
      "tenLoai": "Khách hàng"
    },
    "thongTinDatVe": [
      {
        "danhSachGhe": [
          {
            "maHeThongRap": "BHDStar",
            "tenHeThongRap": "BHD Star Cineplex - Phạm Hùng",
            "maCumRap": "Rạp 6",
            "tenCumRap": "Rạp 6",
            "maRap": 476,
            "tenRap": "Rạp 6",
            "maGhe": 51401,
            "tenGhe": "01"
          },
          {
            "maHeThongRap": "BHDStar",
            "tenHeThongRap": "BHD Star Cineplex - Phạm Hùng",
            "maCumRap": "Rạp 6",
            "tenCumRap": "Rạp 6",
            "maRap": 476,
            "tenRap": "Rạp 6",
            "maGhe": 51402,
            "tenGhe": "02"
          }
        ],
        "maVe": 68431,
        "ngayDat": "2021-10-02T20:36:07.077",
        "tenPhim": "Mortal Kombat ",
        "hinhAnh": "https://movienew.cybersoft.edu.vn/hinhanh/mortal-kombat_gp10.jpg",
        "giaVe": 82000,
        "thoiLuongPhim": 120
      }
    ]
  },

*/
