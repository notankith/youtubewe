document.addEventListener('DOMContentLoaded', function() {
    const downloadBtn = document.getElementById('downloadBtn');
    const videoUrlInput = document.getElementById('videoUrl');
    const downloadLinks = document.getElementById('downloadLinks');
  
    downloadBtn.addEventListener('click', async function() {
      const videoUrl = videoUrlInput.value.trim();
      if (videoUrl) {
        try {
          const response = await fetch('/download', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url: videoUrl })
          });
  
          const data = await response.json();
          if (data.success) {
            const link = document.createElement('a');
            link.href = data.url;
            link.textContent = 'Download Video';
            link.classList.add('block', 'text-blue-500', 'hover:text-blue-600', 'mt-2');
            downloadLinks.innerHTML = ''; // Clear previous links
            downloadLinks.appendChild(link);
          } else {
            // Handle error
            console.error(data.error);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      } else {
        console.error('Please enter a valid YouTube video URL');
      }
    });
  });
  