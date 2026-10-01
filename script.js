const menuToggle=document.getElementById("menuToggle");
const nav=document.getElementById("nav");
menuToggle.addEventListener("click",()=>{const opened=nav.classList.toggle("open");menuToggle.setAttribute("aria-expanded",String(opened));});
nav.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{nav.classList.remove("open");menuToggle.setAttribute("aria-expanded","false");}));
document.getElementById("year").textContent=new Date().getFullYear();

// Hiệu ứng ánh sáng mượt cấp độ 120Hz (Sử dụng Lerp mượt mà & Transform3d tối ưu GPU)
const cursorGlow = document.getElementById("cursorGlow");
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let currentX = mouseX;
let currentY = mouseY;

window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
}, { passive: true });

function updateCursorGlow() {
  // Hệ số lerp 0.22 giúp phản hồi cực kỳ nhanh, mượt trên màn hình 120Hz/144Hz
  currentX += (mouseX - currentX) * 0.22;
  currentY += (mouseY - currentY) * 0.22;
  cursorGlow.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
  requestAnimationFrame(updateCursorGlow);
}
requestAnimationFrame(updateCursorGlow);

const music=document.getElementById("bgMusic");
const musicToggle=document.getElementById("musicToggle");
let playing=false;
musicToggle.addEventListener("click",async()=>{if(!playing){try{await music.play();playing=true;musicToggle.setAttribute("aria-pressed","true");musicToggle.innerHTML="♫ <span>Tắt nhạc</span>";}catch(e){alert("Hãy thêm tệp assets/audio/music.mp3 rồi thử lại.");}}else{music.pause();playing=false;musicToggle.setAttribute("aria-pressed","false");musicToggle.innerHTML="♫ <span>Nhạc</span>";}});

// Xem trước ảnh và lấp đầy khung vừa khít
document.querySelectorAll('.image-input').forEach(input=>{
  input.addEventListener('change',()=>{
    const file=input.files && input.files[0];
    if(!file) return;
    if(!file.type.startsWith('image/')) { alert('Vui lòng chọn tệp hình ảnh.'); input.value=''; return; }
    const frame=input.closest('.image-frame, .gallery-item');
    const img=frame && frame.querySelector('img');
    const placeholder=frame && frame.querySelector('.image-placeholder');
    if(!img || !frame) return;
    if(img.dataset.objectUrl) URL.revokeObjectURL(img.dataset.objectUrl);
    const url=URL.createObjectURL(file);
    img.dataset.objectUrl=url;
    img.src=url;
    img.hidden=false;
    if(placeholder) placeholder.hidden=true;
  });
});
