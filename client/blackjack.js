document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#024330';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = '30px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText('Hello, world!', 50, 50);
});