//Profile.js
$(function() {
    $(".fit-down").click(function() {
        $("#profile-info-div").hasClass("invisible") ? $("#profile-info-div").removeClass("invisible") : $("#profile-info-div").addClass("invisible");
        $(".fit-down").hasClass("rotate") ? $(".fit-down").removeClass("rotate") : $(".fit-down").addClass("rotate");
    });
    $("label[for=anonymous]").click(function() {
        $(".checkbox-icon").hasClass("blue-checkbox") ? $(".checkbox-icon").removeClass("blue-checkbox") : $(".checkbox-icon").addClass("blue-checkbox");
        $("#userinfo").prop("checked", !$("#userinfo").prop("checked"));
        if ($("#userinfo").prop("checked")) {
            $("#userinfo").val("anonymous");
        } else {
            $("#userinfo").val("with name");
        }
    });
    var username = $("#visited-username").text();
    var page = 2;
    $(".list-more > span").click(function() {
        if (page === false) {
            return;
        }
        $.ajax({
            type: "POST",
            url: "https://m.qooh.me/userprofile/designed-index/",
            data: {
                page: page++,
                username: username,
                tp: "ajax"
            },
            success: function(response) {
                if (!!response) {
                    $("#paging-loader").before(response);
                } else {
                    page = false;
                }
            }
        });
    });
    function toggleQuestionProfile() {
        $("#owner-container").hasClass("invisible") ? $("#owner-container").removeClass("invisible") : $("#owner-container").addClass("invisible");
        $(".profile, .logged-out-profile").each(function() {
            $(this).hasClass("invisible") ? $(this).removeClass("invisible") : $(this).addClass("invisible");
        });
    }
    $(".profile").click(function(e) {
        e.preventDefault();
        toggleQuestionProfile();
        $("#question").val("");
        $("#designed-question_form").removeClass("invisible").siblings(".three-quarters-loader").addClass("invisible");
    });
    var canSubmit = true;
    $("#designed-question_form").submit(function(e) {
        e.preventDefault();
        if (!canSubmit) {
            return;
        } else if (!$(this).find("#question").val().trim()) {
            $("#profile-submit-error").removeClass("invisible").find(".error-text").text("Type something");
            Android.showToast("Type Something");
            return;
        } else {
            canSubmit = false;
        }
        $("#profile-submit-error").addClass("invisible");
        var that = $(this);
        that.siblings(".three-quarters-loader").removeClass("invisible");
        var params = {
            tp: "ajax"
        };
        $(this).find("[name]").each(function() {
            params[$(this).attr("name")] = $(this).val();
        });
        /*$.ajax({
            type: "POST",
            url: url,
            data: params,
            success: function(response) {
                that.addClass("invisible");
                canSubmit = true;
                if (response === "Success") {
                    toggleQuestionProfile();
                } else {
                    $("#designed-question_form").removeClass("invisible").siblings(".three-quarters-loader").addClass("invisible");
                    $("#profile-submit-error").removeClass("invisible").find(".error-text").text(response);
                }
            }
        });*/
        Android.POST("https://m.qooh.me/userprofile/designed-index/",JSON.stringify(params));
        toggleQuestionProfile();
    });
    url = "https://m.qooh.me/userprofile/designed-index/";
});
function followCallback(context, response) {
    if (response === "success") {
        if (context.hasClass("follow-ajax")) {
            context.removeClass("follow-ajax").addClass("unfollow-ajax");
            $(".other-user-profile-follow").removeClass("icon-plus").addClass("icon-check");
            $(".designed-follow-button").removeClass("designed-follow-button").addClass("designed-unfollow-button").attr("name", "unfollowBtn").val("Following");
        } else {
            context.removeClass("unfollow-ajax").addClass("follow-ajax");
            $(".other-user-profile-follow").removeClass("icon-check").addClass("icon-plus");
            $(".designed-unfollow-button").removeClass("designed-unfollow-button").addClass("designed-follow-button").attr("name", "followBtn").val("Follow");
        }
    }
}


//Common.js
var url = "";
$(function() {
    $("#question_list").on("click", ".three-dots-span, .icon-close", function(e) {
        if ($(this).hasClass("three-dots-span")) {
            var context = $(this).parent();
            if ((context.find(".designed-action-popup").hasClass("invisible"))) {
                context.find(".designed-action-popup").removeClass("invisible").addClass("black").find(".popup-action-container").removeClass("invisible");
            }
        } else if ($(this).hasClass("icon-close")) {
            $(this).parent().parent().removeClass("black").addClass("invisible");
        }
    });
    $(".action").on("click", ".white-popup-action, .icon-close", function(e) {
        if ($(this).hasClass("white-popup-action")) {
            var context = $(this).parent();
            if ((context.find(".designed-action-popup").hasClass("invisible"))) {
                context.find(".designed-action-popup").removeClass("invisible").addClass("white");
                setTimeout(function() {
                    $(".popup-action-container-1").css({
                        "transform": "scale(1, 1)",
                        "transition": "all 0.4s ease-in-out 0s"
                    });
                }, 1);
            }
        } else if ($(this).hasClass("icon-close")) {
            $(".popup-action-container-1").css({
                "transform": "scale(0, 0)",
                "transition": "all 0.4s ease-in-out 0s"
            });
            var that = $(this);
            setTimeout(function() {
                that.parent().removeClass("white").addClass("invisible");
            }, 400);
        }
    });
    $("body").on("submit", ".follow-ajax, .unfollow-ajax", function(e) {
        e.preventDefault();
        var that = $(this);
        var data = {
            tp: "ajax"
        };
        if (!!$(this).attr("name")) {
            data[$(this).attr("name")] = $(this).val();
        }
        that.find("[name]").each(function() {
            data[$(this).attr("name")] = $(this).val();
        });
        Android.POST("https://m.qooh.me/userprofile/designed-index/",JSON.stringify(data));
        followCallback(that, "success");
    });
    $("body").on("submit", ".like-unlike", function(e) {
        e.preventDefault();
        $(this).find("[name=likeunlike]").prop("disabled", true);
        var that = $(this);
        that.siblings(".likers-number-span").addClass("invisible");
        that.siblings(".three-quarters-loader-like").removeClass("invisible");
        var data = {
            tp: "ajax"
        };
        if (!!$(this).attr("name")) {
            data[$(this).attr("name")] = $(this).val();
        }
        that.find("[name]").each(function() {
            data[$(this).attr("name")] = $(this).val();
        });
        $.ajax({
            url: url,
            type: "POST",
            data: data,
            success: function(response) {
                that.siblings(".three-quarters-loader-like").addClass("invisible");
                that.siblings(".likers-number-span").removeClass("invisible");
                var likerNumber = parseInt(that.siblings(".likers-number-span").find("a").text());
                if (that.find("span").find("input").hasClass("like-btn")) {
                    that.find(".icon-heart2").attr("style", "color: #DA398D;").find(".like-btn").removeClass("like-btn").addClass("unlike-btn").val("Unlike");
                    if (isNaN(likerNumber)) {
                        likerNumber = 0;
                    }
                    that.siblings(".likers-number-span").find("a").text(++likerNumber);
                } else {
                    that.find(".icon-heart2").attr("style", "").find(".unlike-btn").removeClass("unlike-btn").addClass("like-btn").val("Like");
                    likerNumber--;
                    if (likerNumber === 0) {
                        likerNumber = "";
                    }
                    that.siblings(".likers-number-span").find("a").text(likerNumber);
                }
                that.find("[name=likeunlike]").removeAttr("disabled");
            }
        });
    });
});


//paging.js
function Paging(options) {
    var pageSize = options["pageSize"];
    var invisibleSelector = options["invisibleSelector"];
    var pagerSelector = options["pagerSelector"];
    var t = options["t"];
    var spinnerSelector = options["spinner"];
    function toSpinOrNotToSpin(show) {
        if (!!spinnerSelector) {
            if (show) {
                $(spinnerSelector).removeClass("invisible");
                $(pagerSelector).addClass("invisible");
            } else {
                $(spinnerSelector).addClass("invisible");
                $(pagerSelector).removeClass("invisible");
            }
        }
    }
    this.next = function() {
        toSpinOrNotToSpin(true);
        setTimeout(function() {
            toSpinOrNotToSpin(false);
            $(invisibleSelector + ".invisible").each(function(index) {
                if (index < pageSize) {
                    $(this).removeClass("invisible");
                }
            });
            if ($(invisibleSelector + ".invisible").length === 0) {
                $(pagerSelector).addClass("invisible");
            }
        }, t);
    }
    ;
}

//Reply.js
$(document).ready(function(){
  $("#share-button").click(function(){
        console.log("reply");
        var resp1 = $("textarea")[0].value;
        var url1 = $("#url")[0].innerText;
      if(resp1.length>0){
      Android.REPLY(url1,resp1);
      }else{
      Android.showToast("Type Something");
      }
        
  });
});

//Privacy.js
$(document).ready(function(){
$("#privacy_settings .submit").click(function(){
var valuei = $("#privacy_settings > div:nth-child(1) > div > span > select").val()
Android.PRIVACY("allow_question="+valuei+"&process=&submit=Save");
});});

$(document).ready(function(){
$("#lock-inbox-form .submit").click(function(){
    if($("#lock-inbox-form .submit").val() == "Lock"){
        Android.PRIVACY("allow_question=-1&lock=Lock&process=");
    }
    else{
        Android.PRIVACY("allow_question=1&unlock=Unlock&process=");
    }});});
$(document).ready(function(){
$("#inbox-delete-all").hide();
$("#designed-change-pic-button").hide();
});

//Delete.js
$(document).ready(function(){
$("#frm_signup > div > input:nth-child(1)").click(function(){
   //Yes
    var url1 = $("#url")[0].innerText;
    Android.DELETE(url1);
})
$("#frm_signup > div > input:nth-child(2)").click(function(){
   //No
   Android.INBOX();
})
});

//Setting.js
$(document).ready(function(){
$(function() {
    var isValid = true;
    function handleInvalid(selector, text) {
        isValid = false;
        $(selector).siblings(".error").find(".error-text").text(text).siblings(".error-icon").removeClass("invisible");
        window.scroll(0, $(selector).parent().offset().top);
    }
    function isValidForm() {
        isValid = true;
        var selector = "#username";
        var username = $(selector).val();
        if (!username) {
            handleInvalid(selector, "Please enter username");
        } else if (username.length > 15) {
            handleInvalid(selector, "Maximum 15 characters");
        } else if (username.length < 4) {
            handleInvalid(selector, "Minimum 4 characters");
        } else if (!(/^[A-Za-z0-9_.]+$/.test(username))) {
            handleInvalid(selector, "Usernames can only contain A-Z, a-z, 0-9, _ and periods (.)");
        } else if (!(/^[A-Za-z]+$/.test(username.substring(0, 1)))) {
            handleInvalid(selector, "Usernames can only start with letter");
        }
        if (isValid) {
            selector = "#name";
            var name = $(selector).val();
            if (!name) {
                handleInvalid(selector, "Please enter name");
            } else if (name.length > 25) {
                handleInvalid(selector, "Maximum 25 characters");
            }
        }
        if (isValid) {
            selector = "#email";
            var email = $(selector).val();
            if (!email) {
                handleInvalid(selector, "Please enter email");
            } else if (!(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email))) {
                handleInvalid(selector, "Please enter valid email address");
            }
        }
        if (isValid) {
            selector = "#bio";
            var bio = $(selector).val();
            if (bio.length > 160) {
                handleInvalid(selector, "Maximum 160 characters");
            }
        }
        if (isValid) {
            selector = "#question_title";
            var headline = $(selector).val();
            if (!headline) {
                handleInvalid(selector, "Please enter headline");
            }
        }
        return isValid;
    }
    var isSaving = false;
    $("#frm_setting").submit(function(e) {
        e.preventDefault();
        $(".error-icon:not(.invisible)").addClass("invisible");
        $(".error-text").text("");
        if (isValidForm()) {
            if (isSaving) {
                return;
            }
            isSaving = true;
            var dataToPost = {
                tp: "ajax"
            };
            $("#frm_setting input[type=text], #frm_setting textarea").each(function() {
                dataToPost[$(this).attr("name")] = $(this).val();
            });
            $(".three-quarters-loader-set-prof:last").removeClass("invisible");
            $.ajax({
                type: "POST",
                url: "http://" + window.location.host + "/settings/designed-profile/",
                data: dataToPost,
                success: function(response) {
                    $(".three-quarters-loader-set-prof:last").addClass("invisible");
                    if (response === "success") {
                        $(".designed-success").html("<div class=\"success\"><span class='icon-check'></span>Your Profile information is saved successfully</div>");
                        window.scrollTo(0, 0);
                        $("#menu-ul li:eq(3) > a").attr("href", "/" + $("#username").val());
                    } else {
                        var resp = $.parseJSON(response);
                        for (var element in resp) {
                            handleInvalid("#" + element, resp[element]);
                        }
                    }
                    isSaving = false;
                }
            });
        }
    });
    var beingUploaded = false;
    $("#profile-form-font-size").submit(function(e) {
        if (beingUploaded) {
            return;
        }
        beingUploaded = true;
        e.preventDefault();
        $(".three-quarters-loader-set-prof:first").removeClass("invisible");
        var formData = new FormData(this);
        formData.tp = "ajax";
        $.ajax({
            type: "POST",
            url: "https://m.qooh.me/settings/designed-profile/",
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function(response) {
                if (!!response) {
                    $(".photo.designed-picture").attr("src", response);
                    $(".three-quarters-loader-set-prof:first").addClass("invisible");
                    beingUploaded = false;
                    $("#choose-file-div").addClass("invisible");
                } else {
                    window.location.href = window.location.href;
                }
            },
            error: function(response) {
                console.log("failure");
            }
        });
    });
});
});

//Restore
$(document).ready(function(){
$("div.designed-disable-div > form > input.designed-restore-button").click(function(){
if($("div.designed-disable-div > form > input.designed-restore-button").val() == "Disable My Account"){
    Android.C("disable=Disable+My+Account&process=");
}
    else{
        Android.C("restore=Restore+My+Account&process=");
    }
});
});
