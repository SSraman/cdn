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
    $("#responded_question").on("click", ".delete", function(e) {
        e.preventDefault();
        console.log("Delete Clicked.");
        if (confirm("You're about to delete this post. By doing so the question will go back to your inbox.")) {
            var currentID = $(this).attr("href").substring($(this).attr("href").indexOf('rid/') + 4).replace("/", "");
            var that = this;
            $.ajax({
                type: "POST",
                url: "https://m.qooh.me/userprofile/designed-index/",
                data: {
                    question: currentID,
                    action: "remove",
                    tp: "ajax"
                },
                success: function(response) {
                    $(that).siblings(".icon-close").click();
                    $("#question" + currentID).remove();
                    $("#designed-inbox-count").text(response);
                }
            });
        }
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
        $.ajax({
            url: url,
            type: "POST",
            data: data,
            success: function(response) {
                followCallback(that, response);
            }
        });
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

var canPostToFacebook = false;
var canPostToTwitter = false;
$(function() {
    var canSubmit = true;
    $("#frm_signup").submit(function(e) {
        e.preventDefault();
        if (!canSubmit) {
            return;
        } else if (!$(".input-field textarea").val().trim()) {
            $("#answer-error").removeClass("invisible").find(".error-text").text("Type something");
            return;
        } else {
            canSubmit = false;
        }
        $("#answer-error").addClass("invisible");
        var that = $(this);
        that.siblings(".three-quarters-loader").removeClass("invisible");
        var params = {};
        $(this).find("[name]").each(function() {
            if ($(this).attr("type") === "checkbox") {
                if ($(this).is(":checked")) {
                    params[$(this).attr("name")] = "on";
                }
            } else {
                params[$(this).attr("name")] = $(this).val();
            }
        });
        $.ajax({
            type: "POST",
            url: "https://m.qooh.me/inbox/?a=reply&id=133847533",
            data: params,
            success: function(response) {
                that.siblings(".three-quarters-loader").addClass("invisible");
                canSubmit = true;
                if (response === "Success") {
                    function displaySuccess(index) {
                        if (index <= 3) {
                            setTimeout(function() {
                                $(".designed-success").removeClass("invisible").find(".success").html($(".designed-success .success").html() + ".");
                                displaySuccess(index + 1);
                            }, 200);
                        } else {
                           //window.location.href = "http://" + window.location.host + "/account/inbox/";
                        }
                    };
                    displaySuccess(0);
                } else {
                    $("#answer-error").removeClass("invisible").find(".error-text").text("Error While Posting Your Answer :(");
                }
            }
        });
    });
});
