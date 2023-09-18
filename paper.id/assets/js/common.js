$(window).scroll(function(){
    if ($(window).scrollTop() >= 10) {
        $('.mainNav').addClass('navScroll');
    }
    else {
        $('.mainNav').removeClass('navScroll');
    }
});

var dengan_rupiah = document.getElementById('jmlPinjaman');
    dengan_rupiah.addEventListener('keyup', function(e)
    {
        dengan_rupiah.value = formatRupiah(this.value, 'Rp ');
    });
    
    function formatRupiah(angka, prefix)
    {
        var number_string = angka.replace(/[^,\d]/g, '').toString(),
            split    = number_string.split(','),
            sisa     = split[0].length % 3,
            rupiah     = split[0].substr(0, sisa),
            ribuan     = split[0].substr(sisa).match(/\d{3}/gi);
            
        if (ribuan) {
            separator = sisa ? '.' : '';
            rupiah += separator + ribuan.join('.');
        }
        
        rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
        return prefix == undefined ? rupiah : (rupiah ? 'Rp ' + rupiah : '');
    };

$('input[type="text"]').on('keydown, keyup', function () {
    //get a reference to the text input value
    $('#jmlPinjaman').val();
    
    //show the text input value in the UI
    $('#jmlFee').html('1.1%');
    $('#jmlFee').addClass('active');
});

// const inputs = document.querySelectorAll('input');
// const submit = document.querySelector('.btn-control');

// function init() {
//   const isFill = [...inputs].every(({value}) => value.trim().length);
//   submit.classList.toggle('enable',isFill);
// }

// document.addEventListener('keyup',init,false);

// $(document).ready(function(){
//     $('.btn-control').attr('disabled',false);
// });

  var dengan_rupiah2 = document.getElementById('jmlPinjaman2');
  dengan_rupiah2.addEventListener('keyup', function(e)
  {
      dengan_rupiah2.value = formatRupiah(this.value, 'Rp ');
  });
  
  function formatRupiah(angka2, prefix)
  {
      var number_string2 = angka2.replace(/[^,\d]/g, '').toString(),
          split2    = number_string2.split(','),
          sisa2     = split2[0].length % 3,
          rupiah2     = split2[0].substr(0, sisa2),
          ribuan2     = split2[0].substr(sisa2).match(/\d{3}/gi);
          
      if (ribuan2) {
          separator2 = sisa2 ? '.' : '';
          rupiah2 += separator2 + ribuan2.join('.');
      }
      
      rupiah2 = split2[1] != undefined ? rupiah2 + ',' + split2[1] : rupiah2;
      return prefix == undefined ? rupiah2 : (rupiah2 ? 'Rp ' + rupiah2 : '');
  };

  $(document).on('change', '.file-input', function() {

    if (typeof (FileReader) != "undefined") {
        var dvPreview = $("#divImageMediaPreview");
        dvPreview.html("");            
        $($(this)[0].files).each(function () {
            var file = $(this);                
                var reader = new FileReader();
                reader.onload = function (e) {
                    var img = $("<img />");
                    img.attr("src", e.target.result);
                    dvPreview.append(img);
                }
                reader.readAsDataURL(file[0]);                
        });
        } else {
        alert("This browser does not support HTML5 FileReader.");
        }


    });

var input = document.getElementById( 'upload1' );
var infoArea = document.getElementById( 'file-upload-filename' );

input.addEventListener( 'change', showFileName );

function showFileName( event ) {
  
  // the change event gives us the input it occurred in 
  var input = event.srcElement;
  
  // the input has an array of files in the `files` property, each one has a name that you can use. We're just using the name here.
  var fileName = input.files[0].name;
  
  // use fileName however fits your app best, i.e. add it into a div
  infoArea.textContent = fileName;
}

var pdfjsLib = window['pdfjs-dist/build/pdf'];
// The workerSrc property shall be specified.
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://mozilla.github.io/pdf.js/build/pdf.worker.js';

$("#myPdf").on("change", function(e){
	var file = e.target.files[0]
	if(file.type == "application/pdf"){
		var fileReader = new FileReader();  
		fileReader.onload = function() {
			var pdfData = new Uint8Array(this.result);
			// Using DocumentInitParameters object to load binary data.
			var loadingTask = pdfjsLib.getDocument({data: pdfData});
			loadingTask.promise.then(function(pdf) {
			  console.log('PDF loaded');
			  
			  // Fetch the first page
			  var pageNumber = 1;
			  pdf.getPage(pageNumber).then(function(page) {
				console.log('Page loaded');
				
				var scale = 1.5;
				var viewport = page.getViewport({scale: scale});

				// Prepare canvas using PDF page dimensions
				var canvas = $("#pdfViewer")[0];
				var context = canvas.getContext('2d');
				canvas.height = viewport.height;
				canvas.width = viewport.width;

				// Render PDF page into canvas context
				var renderContext = {
				  canvasContext: context,
				  viewport: viewport
				};
				var renderTask = page.render(renderContext);
				renderTask.promise.then(function () {
				  console.log('Page rendered');
				});
			  });
			}, function (reason) {
			  // PDF loading error
			  console.error(reason);
			});
		};
		fileReader.readAsArrayBuffer(file);
	}
});

$('#myPdf').change(function() {
    var i = $(this).prev('label').clone();
    var file = $('#myPdf')[0].files[0].name;
    $(this).prev('label').text(file);
  });



(function () {

  'use strict';
  

  const preventDefaults = event => {
    event.preventDefault();
    event.stopPropagation();
  };

  const highlight = event =>
    event.target.classList.add('highlight');
  
  const unhighlight = event =>
    event.target.classList.remove('highlight');

  const getInputAndGalleryRefs = element => {
    const zone = element.closest('.upload_dropZone') || false;
    const gallery = zone.querySelector('.upload_gallery') || false;
    const input = zone.querySelector('input[type="file"]') || false;
    return {input: input, gallery: gallery};
  }

  const handleDrop = event => {
    const dataRefs = getInputAndGalleryRefs(event.target);
    dataRefs.files = event.dataTransfer.files;
    handleFiles(dataRefs);
  }


  const eventHandlers = zone => {

    const dataRefs = getInputAndGalleryRefs(zone);
    if (!dataRefs.input) return;

    // Prevent default drag behaviors
    ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(event => {
      zone.addEventListener(event, preventDefaults, false);
      document.body.addEventListener(event, preventDefaults, false);
    });

    // Highlighting drop area when item is dragged over it
    ;['dragenter', 'dragover'].forEach(event => {
      zone.addEventListener(event, highlight, false);
    });
    ;['dragleave', 'drop'].forEach(event => {
      zone.addEventListener(event, unhighlight, false);
    });

    // Handle dropped files
    zone.addEventListener('drop', handleDrop, false);

    // Handle browse selected files
    dataRefs.input.addEventListener('change', event => {
      dataRefs.files = event.target.files;
      handleFiles(dataRefs);
    }, false);

  }


  const dropZones = document.querySelectorAll('.upload_dropZone');
  for (const zone of dropZones) {
    eventHandlers(zone);
  }


  const isImageFile = file => 
    ['image/jpeg', 'image/png', 'image/svg+xml'].includes(file.type);


  function previewFiles(dataRefs) {
    if (!dataRefs.gallery) return;
    for (const file of dataRefs.files) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = function() {
        let img = document.createElement('img');
        img.className = 'upload_img mt-2';
        img.setAttribute('alt', file.name);
        img.src = reader.result;
        dataRefs.gallery.appendChild(img);
        $('.nm-upload').css('display','none');
        $('svg').css('display','none');
      }
    }
  }

  const imageUpload = dataRefs => {

    // Multiple source routes, so double check validity
    if (!dataRefs.files || !dataRefs.input) return;

    const url = dataRefs.input.getAttribute('data-post-url');
    if (!url) return;

    const name = dataRefs.input.getAttribute('data-post-name');
    if (!name) return;

    const formData = new FormData();
    formData.append(name, dataRefs.files);

    fetch(url, {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      console.log('posted: ', data);
      if (data.success === true) {
        previewFiles(dataRefs);
      } else {
        console.log('URL: ', url, '  name: ', name)
      }
    })
    .catch(error => {
      console.error('errored: ', error);
    });
  }


  // Handle both selected and dropped files
  const handleFiles = dataRefs => {

    let files = [...dataRefs.files];

    // Remove unaccepted file types
    files = files.filter(item => {
      if (!isImageFile(item)) {
        console.log('Not an image, ', item.type);
      }
      return isImageFile(item) ? item : null;
    });

    if (!files.length) return;
    dataRefs.files = files;

    previewFiles(dataRefs);
    imageUpload(dataRefs);
  }

})();

$(document).ready(function() {
    $('#step-1').click(function() {
      $('.step-1').slideUp("slow");
      $('.step-2').slideDown("slow");
    });
    $('#step-2').click(function() {
        $('#for-step-2').fadeIn(500);
      });
      $('#step-2-b').click(function() {
        $('.step-2').slideUp("slow");
        $('.step-3').slideDown("slow");
        $('#for-step-2').fadeOut(500);
      });
      $('#step-3').click(function() {
        $('.step-4').slideDown("slow");
        $('.step-3').slideUp("slow");
        
      });
      $('#step-4').click(function() {
        $('#for-step-4').fadeIn(500);
      });
      $('#step-4-b').click(function() {
        $('#for-step-4').fadeOut(500);
        $('#for-step-4-a').fadeIn(500);
      });
      $("#step-4-c").on("click", function() {
        history.go(0);
    });
    $('.burgerNav').click(function() {
        $('.mobile-menu').fadeIn(500);
      });
      $('.btn-close').click(function() {
        $('.mobile-menu').fadeOut(500);
      });
});

$(document).ready(function () {
	$(".form-spinner input").each(function (i, spinner) {
		if ($(this).data("type") === "text") {
			let index = $(this).data("spinner-index") || 0;
			let items = $(this).data("spinner-items");
			
			$(this).val(items[index]);
		}
	});
	
	$(".form-spinner .btn-increment").click(function () {
		let $this		= $(this);
		let input		= $this.siblings("input");
		
		if (input.data("type") === "number") {
			let step		 = input.attr("step");
			let oldValue = input.val();
			let newValue = parseInt(oldValue) + parseInt(step || 1);
			let maxValue = input.attr("max");
			let minValue = input.attr("min");
			
			if (!maxValue || newValue <= maxValue)
				input.val(newValue);
			else if (input.data("spinner-loop"))
				input.val(minValue);
			else 
				input.val(maxValue);
		} else if (input.data("type") === "text") {
			let oldIndex = input.data("spinner-index") || 0;
			let items 	 = input.data("spinner-items");
			let newIndex = oldIndex + 1;

			if (newIndex < items.length) {
				input.val(items[newIndex]);
				input.data("spinner-index", newIndex);
			} else if (input.data("spinner-loop")){
				input.val(items[0]);
				input.data("spinner-index", 0);
			}
	   }	
		
	});
$(".form-spinner .btn-decrement").click(function () {
		let $this		= $(this);
		let input		= $this.siblings("input");
		
		if (input.data("type") === "number") {
			let step		 = input.attr("step");
			let oldValue = input.val();
			let newValue = parseInt(oldValue) - parseInt(step || 1);
			let maxValue = input.attr("max");
			let minValue = input.attr("min");

			if (!minValue || newValue >= minValue)
				input.val(newValue);
			else if (input.data("spinner-loop"))
				input.val(maxValue);
			else
				input.val(minValue);
		} else if (input.data("type") === "text") { 
			let oldIndex = input.data("spinner-index") || 0;
			let items 	 = input.data("spinner-items");
			let newIndex = oldIndex - 1;

			if (newIndex >= 0) {
				input.val(items[newIndex]);
				input.data("spinner-index", newIndex);
			} else if (input.data("spinner-loop")){
				input.val(items[items.length - 1]);
				input.data("spinner-index", items.length - 1);
			}
		}
	});
});