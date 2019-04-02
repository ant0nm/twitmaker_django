from django.forms.models import model_to_dict
from django.http import HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from twitmaker.models import Tweet
from twitmaker.forms import TweetForm

def index(request):
    tweets = Tweet.objects.all().order_by("-created_at")
    context = {'tweets': tweets, 'form': TweetForm()}
    return render(request, 'index.html', context)


def create_tweet(request):
    form = TweetForm(request.POST)
    tweet = form.instance
    if form.is_valid():
        form.save()
        tweet_dict = model_to_dict(tweet)
        tweet_dict['created_at'] = tweet.created_at
        return JsonResponse(tweet_dict)
    else:
        context = {'tweets': Tweet.objects.all().order_by("-created_at"), 'form': form}
        return render(request, 'index.html', context)
