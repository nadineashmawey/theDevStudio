
  const uploadArea = document.getElementById('upload-area');
  const fileInput = document.getElementById('file-input');

  // click to open file picker
  uploadArea.addEventListener('click', () => {
    fileInput.click();
  });

  // when file is selected show preview
  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      uploadArea.style.backgroundImage = `url(${e.target.result})`;
      uploadArea.style.backgroundSize = 'cover';
      uploadArea.style.backgroundPosition = 'center';
      uploadArea.querySelector('.upload-icon').style.display = 'none';
      uploadArea.querySelector('.upload-text').textContent = file.name;
      uploadArea.querySelector('.upload-hint').textContent = 'Click to change image';
    };
    reader.readAsDataURL(file);
  });

  // drag and drop
  uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = 'var(--pink)';
  });

  uploadArea.addEventListener('dragleave', () => {
    uploadArea.style.borderColor = 'rgba(255,255,255,0.2)';
  });

  uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file) return;
    fileInput.files = e.dataTransfer.files;
    fileInput.dispatchEvent(new Event('change'));
  });
