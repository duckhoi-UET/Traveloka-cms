export default {
  methods: {
    generateRandomNumberCard() {
      var min = 100000000;
      var max = 999999999;
      var numberCard = Math.floor(Math.random() * (max - min + 1)) + min;
      return numberCard;
    },

    generateFullName() {
      var hoList = ["Nguyễn", "Trần", "Lê", "Phạm", "Hoàng"];
      var tenNamList = ["An", "Bình", "Đức", "Minh", "Quang"];
      var tenNuList = ["Hương", "Lan", "Ngọc", "Phương", "Trang"];
      var ho = hoList[Math.floor(Math.random() * hoList.length)];
      var ten;
      if (Math.random() < 0.5) {
        ten = tenNamList[Math.floor(Math.random() * tenNamList.length)];
      } else {
        ten = tenNuList[Math.floor(Math.random() * tenNuList.length)];
      }
      var hoTen = ho + " " + ten;
      return hoTen;
    },

    generateEmail() {
      var tuList = [
        "nguyen",
        "khoi",
        "minh",
        "hoang",
        "trang",
        "hanh",
        "sudoku",
      ];
      var soList = ["123", "456", "789", "007", "888"];
      var tuNgauNhien = tuList[Math.floor(Math.random() * tuList.length)];
      var soNgauNhien = soList[Math.floor(Math.random() * soList.length)];
      var domain = ["gmail.com", "yahoo.com", "hotmail.com"];
      var domainNgauNhien = domain[Math.floor(Math.random() * domain.length)];
      var email = tuNgauNhien + soNgauNhien + "@" + domainNgauNhien;
      return email;
    },
    generatePhoneNumber() {
      var maQuocGia = "+0";
      var maKhuVuc = "9";

      var soCuoi = "";
      for (var i = 0; i < 8; i++) {
        var chuSoNgauNhien = Math.floor(Math.random() * 10).toString();
        soCuoi += chuSoNgauNhien;
      }

      var soDienThoai = maQuocGia + maKhuVuc + soCuoi;
      return soDienThoai;
    },
    generateDate() {
      var ngay = Math.floor(Math.random() * 28) + 1;
      var thang = Math.floor(Math.random() * 12) + 1;
      var nam = Math.floor(Math.random() * 4) + 2020;

      var ngayChuoi = ngay < 10 ? "0" + ngay : ngay.toString();
      var thangChuoi = thang < 10 ? "0" + thang : thang.toString();
      var namChuoi = nam.toString();

      var ngayNgauNhien = ngayChuoi + "/" + thangChuoi + "/" + namChuoi;
      return ngayNgauNhien;
    },
    generateRoom() {
      var tang = Math.floor(Math.random() * 3) + 1;
      var soPhong;

      if (tang === 1) {
        soPhong = Math.floor(Math.random() * 300) + 100;
      } else if (tang === 2) {
        soPhong = Math.floor(Math.random() * 300) + 400;
      } else {
        soPhong = Math.floor(Math.random() * 300) + 700;
      }

      return soPhong;
    },
  },
};

