$(document).ready(function() {
    // สมมติว่าเรามีข้อมูลสถานะเริ่มต้นที่ช่องทั้งหมดเป็น 'ว่าง'
    const parkingStatus = {
        1: 'vacant',
        2: 'vacant',
        3: 'vacant',
        4: 'vacant',
        5: 'vacant',
        6: 'vacant'
    };

    // ฟังก์ชันในการดึงสถานะจากเซิร์ฟเวอร์
    function getStatus() {
        // ดึงสถานะจากเซิร์ฟเวอร์ (สมมติว่าเราได้รับข้อมูลสถานะจาก backend)
        for (let i = 1; i <= 6; i++) {
            updateSlotStatus(i, parkingStatus[i]);
        }
    }

    // ฟังก์ชันในการอัปเดตสถานะของแต่ละช่อง
    function updateSlotStatus(slotNumber, status) {
        let statusText = status === 'vacant' ? 'ว่าง' : 'เต็ม';
        let statusColor = status === 'vacant' ? 'vacant' : 'full';

        // อัปเดตสถานะที่ช่อง
        $('#status-' + slotNumber).text('สถานะ: ' + statusText).removeClass('vacant full').addClass(statusColor);
        generateQRCode(slotNumber, status); // สร้าง QR Code สำหรับการจอง
    }

    // ฟังก์ชันในการสร้าง QR Code สำหรับแต่ละช่อง
    function generateQRCode(slotNumber, status) {
        // URL สำหรับการจองที่จอดรถ 
        const qrData = `https://www.parkinglot.com/reserve?slot=${slotNumber}&status=${status}`;
        const qrElement = $('#qr-' + slotNumber);

        // สร้าง QR Code ด้วยการใช้บริการของ Google Chart API
        const qrCodeURL = `https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=${encodeURIComponent(qrData)}`;
        qrElement.html(`<img src="${qrCodeURL}" alt="QR Code" />`);
    }

    // เปลี่ยนสถานะช่องจอดรถ (สำหรับการทดสอบ)
    function changeStatus(slotNumber, status) {
        parkingStatus[slotNumber] = status;
        updateSlotStatus(slotNumber, status);
    }

    // เรียกใช้ฟังก์ชันเพื่อดึงสถานะครั้งแรกเมื่อโหลดหน้า
    getStatus();

    // ตัวอย่างการเปลี่ยนสถานะของช่องจอด
    setTimeout(() => changeStatus(1, 'full'), 5000); // เปลี่ยนช่องที่ 1 เป็นเต็มหลังจาก 5 วินาที
    setTimeout(() => changeStatus(2, 'vacant'), 10000); // เปลี่ยนช่องที่ 2 เป็นว่างหลังจาก 10 วินาที
});
