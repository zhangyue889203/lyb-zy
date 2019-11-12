$(function() {
	jQuery.extend({
		setCookie: function(setKey, setValue, days) {
			var mydate = new Date();
			mydate.setTime(mydate.getTime() + days * 24 * 3600 * 1000);
			document.cookie = setKey + '=' + setValue + ';expries=' + mydate.toGMTString();
		},
		removeCookie: function(removeName) {
			var mydate = new Date();
			mydate.setTime(mydate.getTime() - 10000);
			document.cookie = removeName + '=' + '' + ';expires=' + mydate.toGMTString();
		},
		getCookie: function(getName) {
			var cookies = document.cookie;
			cookies = cookies.split('; ');
			var arrs = [];
			for (var i = 0; i < cookies.length; i++) {
				arrs[i] = cookies[i].split('=');
			}
			for (var j = 0; j < arrs.length; j++) {
				if (getName == arrs[j][0]) {
					return arrs[j][1];
				}
			}
		},
		clearCookie: function() {
			var cookies = document.cookie;
			cookies = cookies.split('; ');
			for (i in cookies) {
				var clearele = cookies[i].split('=');
				$.removeCookie(clearele[0]);
			}
		},
		cookieAltSesion: function() {
			var cookies = document.cookie;
			cookies = cookies.split('; ');
			for (i in cookies) {
				var clearele = cookies[i].split('=');
				sessionStorage.setItem(clearele[0], clearele[1]);
			}
		}
	})

	function chonghui() {
		/*加载内容*/
		$.post('load.php', function(data) {
			data = JSON.parse(decodeURI(data));
			if (data.status == "10001") {
				var datadata = data.data;
				var zonglength = datadata.length;
				var linum = zonglength % 5 == 0 ? zonglength / 5 : Math.ceil(zonglength / 5);
				/*创建页码数*/
				var pagespan = document.createElement('span')
				pagespan.setAttribute('id','pagenums')
				for (var i = 0; i < linum; i++) {
					var pageb = document.createElement('b');
					pageb.innerText = " " + (i + 1) + " ";
					pagespan.appendChild(pageb)
				}
				$('.page')[0].insertBefore(pagespan, $('.beforeadd')[0]);
				/*开始显示页数*/
				changecontent(1);
			}
			/*改变内容函数*/
			function changecontent(num) {
				num = num >= Math.ceil(zonglength / 5) ? Math.ceil(zonglength / 5) : num;
				var originnum = (num - 1) * 5;
				var endnum = originnum + 5;
				if (num == linum) {
					endnum = originnum + (zonglength % 5);
				}
				var str = "";
				for (var i = originnum; i < endnum; i++) {
					var datadatacontent = datadata[i];
					str += "<li index='" + datadatacontent.messageId + "'><div class='li-left'><img src='face/" + datadatacontent.face +
						"'></div><div class='li-right' ><p><span class='li-right-numlou'>作者：</span><span class='li-right-author'>" +
						datadatacontent.author + "</span><span class='lou'>" + datadatacontent.messageId +
						"楼</span></p><p><span class='li-right-numlou'>标题：</span><span class='li-right-author'>" + datadatacontent.title +
						"</span></p><p><div class='li-right-content'>" + datadatacontent.content +
						"</div></p><p><span class='li-right-time'>" + datadatacontent.addTime +
						"</span></p><p><span class='li-right-numlou'>吧主回复：</span> <span class='li-right-author'>";
					if (datadatacontent.reply == null) {
						str += "吧主未回复";
					} else {
						str += datadatacontent.reply;
					}
					str += "</span></p></div></li></li>"
				}
				$('.content-left ul').html(str).attr('index', num);
				$('#pagenums').siblings('input[type=text]').val(num);
				adminenter();
			}
			/*开始点击数字跳转*/
			$('span b').click(function() {
				var num = parseInt($(this).text());
				changecontent(num);
			})
			/*做上下页点击事件*/
			$('.page-toggle').click(function() {
				var flog = $(this).attr('index');
				var num = parseInt($(".content-left ul").attr('index'));
				if (flog == "page-toggle-last") {
					num = num == 1 ? 1 : num - 1;
					changecontent(num);
				}
				if (flog == "page-toggle-next") {
					changecontent(num + 1)
				}
			})
			/*输入框跳转页*/
			$("input[type=button]").click(function() {
				var num = parseInt($(this).prev().val());
				num = num < 1 ? 1 : num;
				changecontent(num);
			})
			/*点击回复留言事件*/
			// $('#adminguanli span:first-child').click(function() {
			// 	if ($(this).text() == '回复留言') {
			// 		$(this).text('取消回复');
			// 		$(this).parent().next().stop().show();
			// 		alert($(this).text())
			// 	} else {
			// 		$(this).parent().next().stop().hide();
			// 		$(this).text('回复留言');
			// 		alert($(this).text())
			// 	}
			// })
		})
	}
	chonghui();
	/*获取cookie添加管理员功能*/
	function adminenter() {
		var login = hex_md5('login');
		var userName = $.getCookie('username');
		var sessionid = $.getCookie('sessionid');
		var success = hex_md5("success" + userName + sessionid);
		if ($.getCookie(login) == success) {
			$('#adminusername').val('');
			$('#adminpwd').val('');
			$('.admin').slideUp();
			$('.top-left-title').text("欢迎管理员" + userName + "登录!");
			if ($('p#adminguanli').length <= 1) {
				var str = "<p id='adminguanli'><span>回复留言</span> <span>删除此贴</span></p>";
				str +=
					"<p id='adminhuifu'><span>回复内容:</span><textarea calss='resize' name='admincontent' rows='5' cols='40' id='admincontent'></textarea><button id='fuifucontent'>回复</button><p>";
				$('.li-right').append(str);
				/*点击回复留言事件*/
				$('#adminguanli span:first-child').click(function() {
					if ($(this).text() == '回复留言') {
						$(this).parent().next().slideDown();
						$(this).text('取消回复');
					}else{
						$(this).text('回复留言');
						$(this).parent().next().slideUp();
					}
				
				})
				/*点击删除该贴事件*/
				$('#adminguanli span:last-child').click(function(){
					var messageId=parseInt($(this).parent().parent().parent().attr('index'));
					$.ajax({
						url: 'delete.php',
						type: 'POST',
						data: {messageId:messageId},
						dataType: 'json',
						success: function(data) {
							if (data.status == '10001') {
								chonghui();
							}
						}
					})
				})
				/*管理员回复帖子*/
				$('button#fuifucontent').click(function() {
					var messageId = parseInt($(this).parent().parent().parent().attr('index'));
					var data = {
						reply: $(this).siblings('textarea').val(),
						messageId: messageId
					};
					$.ajax({
						url: 'huifu.php',
						type: 'POST',
						data: data,
						dataType: 'json',
						success: function(data) {
							if (data.status == '10001') {
								chonghui();
							}
						}
					})
				})
			}
		} else {
			$('.top-left-title').text("猩球崛起留言板");
		}
	}
	adminenter();
	/*发帖开始*/
	/*添加头像*/
	function addface() {
		var str = "";
		for (var i = 1; i < 43; i++) {
			str += "<option value='" + i + ".gif'>" + i + ".gif</option>"
		}
		$('#face').html(str);
	}
	addface();
	/*选择头像图片跟随*/
	$('#face').change(function() {
		$(this).parent().siblings('img').attr('src', 'face/' + $(this).val());
	})
	/*控制发帖框的位置*/
	$(window).scroll(function() {
		var top = $(window).scrollTop();
		if (top >= 340) {
			$('.content-right').addClass('flexwindow');
		} else {
			$('.content-right').removeClass('flexwindow');
		}
	})
	/*发帖提交开始*/
	$('.buttons button').click(function() {
		if ($('#fatierennicheng').val() != '' && $('#fatierentitle').val() != '' && $('#fatiecontent').val() != '') {
			var data = {
				author: $('#fatierennicheng').val(),
				title: $('#fatierentitle').val(),
				face: $('#face').val(),
				content: $('#fatiecontent').val()
			};
			data = JSON.stringify(data);
			$.ajax({
				type: 'POST',
				url: 'addtiezi.php',
				data: data,
				contentType: 'json',
				dataType: 'json',
				success: function(data) {
					if (data.status == "10001") {
						chonghui();
						$('#fatierennicheng').val('');
						$('#fatierentitle').val('');
						$('#fatiecontent').val('');
					} else {
						alert('发帖失败，请确认一下发布的内容');
					}
				}
			})
		}

	})
	/*发帖事件结束*/
	/*管理员登录*/
	/*登录按钮点击事件*/
	$('.admin-enter').click(function() {
		if ($('.top-left-title').text() == '猩球崛起留言板') {
			$('.admin').slideDown();
		}
	})
	/*登录按钮关闭事件*/
	$('.admin-close').click(function() {
		$('.admin').slideUp();
	})
	/*管理员登陆按钮*/
	$('.admindenglu').click(function() {
		$.post('admincheck.php', {
			userName: $('#adminusername').val(),
			pwd: $('#adminpwd').val()
		}, function(data) {
			adminenter();
		})
	})

	/*注销按钮登录事件*/
	$('.admin-cancel').click(function() {
		$.clearCookie();
		chonghui();
		adminenter();
	})
	/*$(function)结束*/
})
