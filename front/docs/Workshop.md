# ChattyPub Workshop Script

## Introduction

ChattyPub is a design tool in the making – leveraging a chat interface to apply styles and formats to the content of a publication. 

The workshop will explore in a practical manner how the process of co-designing a publication can unfold, specifically when several people are working at the same time using a chat interface as the main design tool. During HDSA2021 we would like to open up the process of making this tool and explore together its possibilities and limitations. The workshop will take place towards the end of the one-week summer academy program. Thus, we will be able to use some of the documentation produced during the week — workshops scripts, prototypes, game cards, recipes, ... as well as conversations we will have on different platforms – synchronously and asynchronously. 

Commands allow you to style the texts and images, but someone else can change their appearance again later! How will we negotiate these design decisions synchronously and asynchronously? The outcome could be a zine, posters or a webpage.

This script aims to provide the necessary instructions to host a workshop around ChattyPub that can accomodate different skills and knowledges in different contexts. 


## Goals
- Learn to collaboratively write, design, and print documents using ChattyPub
- Produce publications of / relating to HDSA2021 (documentation, prototypes, conversations, etc...)
- Learn and/or practice styling with CSS & Emojis

## Requirements
- a computer, web-browser, and connection to the internet
- an account for the Hackers & Designers Zulip instance:  https://chat.hackersanddesigners.nl/
- a printer


## Preparation

Before the summer academy: Most important is for all workshop participants to set up a Zulip account on our server. The H&D zulip instance can be found at https://chat.hackersanddesigners.nl/ (public sign ups are temporariy open).

On the first day of the summer academy (monday): Participants are introduced to the Zulip interface and instructed to use it for communication during the course of the week. Zulip makes use of a rather unconventional (but powerful) chat-threading logic, so it would be good to spend some time interacting with it and settle into this new environment.

Workshop hosts and participants are encouraged to think about how they would like to document their processes during the summer academy. What is included and what isn't? How is this shared? Is there a regular moment during the day dedicated to documentation or is it more ad-hoc? We suggest using Etherpad for collaborative note taking, and regularly making screenshots or screenrecordings and photos. We have previously compiled a so-called "tool-ecology", a list of tools we have good experiences with and recommend using during the summer academy: https://etherpad.hackersanddesigners.nl/p/hdsa2021-tool-ecology. 

Texts, notes, chats, images, and screenshots will make great material for our workshop.

## How It Works
### Zulip

On Zulip, conversations are categorized into different "Streams", which are comparable to "channels" in other messaging services like Discord. Streams can be public or private and host conversations consisting of text, images, files, reactions, etc..

What differentiates Zulip from most messaging platforms is the way streams are sub-threaded. Zulip introduces the concept of "Topics", which, in the plainest terms, means that messages have subjects. When sending a message to a stream in Zulip, you can also specify the topic of the message and the stream automatically filters messages by their shared topics. If your message's topic doesn't exist yet, it will be created when you send your message.

Zulip allows you to react to messages using emoji's as well. We will make heavy use of emojis during this workshop.

There are several ways to engage with Zulip, including a web-client, a desktop app, and a mobile app.
### ChattyPub

http://chattypub.hackersanddesigners.nl

ChattyPub is a website that acts as a different interface to the same Zulip service. ChattyPub takes a stream from Zulip, combines messages into long-form articles and uses a design system combining Emojis and CSS syntax to style the messages, effectively turning the stream into a (printable!) webpage.

## Making a publication with Zulip & ChattyPub
### Content

1. Create a stream on Zulip
    - Ensure that the stream name starts with `pub-`.
    - Ensure that the stream is public.
2. Go to [ChattyPub](https://chattypub.hackersanddesigners.nl). The stream you created will be visible on the left-side navigation.
3. Click on your stream.
4. The main (middle) section of the website will have:
    - Your stream name (which will be the name of your publication)
    - The topics of your stream (which will act as "Chapters" in your publication)
    - Topics are collapsed by default, click the expand button next to a topic to display it's messages as an article.
5. To create a new topic (chapter), return to Zulip and type a message to your stream, making sure to send it to the topic you want to create.

### Rules

The right-hand side of the ChattyPub interface is reserved for one topic in your stream: "rules". This topic will house definitions for styles you want to apply to messages in your stream. 

Go back to Zulip and create the topic in your stream called "rules".

Every message you send to this topic should consist of a single emoji followed by a set of styles you'd like applied to messages. For example:

```CSS
🍓 {
  color: red;
  text-decoration: underline;
}
```
These messages should be unique and follow the CSS syntax, as described in the [introduction to CSS](https://github.com/hackersanddesigners/chatty-pub/blob/master/front/docs/CSS.md). If you are comfortable with CSS, you can skip to the part of the document that describes [how CSS is used in ChattyPub](https://github.com/hackersanddesigners/chatty-pub/blob/master/front/docs/CSS.md#css-in-chatty-pub).

To apply these styles to the contents of your publication, head back to any other topic in your stream, select a message you'd like to style, and react to it with the emoji whose styles you want to apply. On ChattyPub, the message should be rendered with these styles.

If you'd like to style only a part of a message, select the message in Zulip and quote and respond to it (in the 3-dot menu). This will produce a text in your input box on the bottom of the interface. Delete the parts of the quoted message that you don't want the styles applied to, and send your response. When you react with an emoji to your own response, the part of the message you quoted will inherit the styles defined for that emoji.

### Printing

TBD

## Workshop

The workshop is split over two sessions (over two days) of 4 hours each.

_Opening Session: Introductions & first encounters with ChattyPub_
- Introductory presentation ( 1hr ) -- will be livestreamed in the morning / recorded and shared afterwards. 
    - Context and background on H&D's publishing activities (Anja & Juliette)
    - Introduction to ChattyPub (Karl).
    - Introduction to CSS (Heerko).
    - How it all comes together (emojis ;])(Karl)
 - Experimenting with ChattyPub! ( 2 hrs ) [How are people going to do this asynchronously? it needs maybe more direction and steps from here]+1
    - all levels of technical knowledge should be accommodated 
    - general knowledge and detailed instructions about CSS can be found [here](https://github.com/hackersanddesigners/chatty-pub/blob/master/front/docs/CSS.md)
    - it's reccommended to group together participants with different levels of experience with CSS
- Brainstorm Session (1 hr) [also for the brainstorm it would be nice to add some suggestions for how to do this if you are not in Amsterdam and maybe not even togeter in a room.]
    - in groups of 2-3, participants brainstorm publications they will make during the main session [Is this brainstorm about content? or about the negotiation process for the layout? can we come up with a format for the brainstorm or some questions as an aid?]
    - If you are planning to print your publication, take into account the printing limitations of your home printer or local print shop [take into account in what way? regarding the format? will i need to adjust something in the css? or in regards to bw/color? ] 

_Main Session: Chat => Print_
- Making publications ( 2 hrs )
    - Groups work on the publications planned in the previous session [how? will there be channels prepared? are people making their own channels?]
    - Organizers are available to help where needed [who are the organizers? in vienna and pittsburgh people will be online on their own.. how do they prepare for that?]
- Printing Publications ( 1 hr )
    - A printer is required in the space (or easily accessible)
    - Accommodating for different paper sizes is an added bonus
    - Binding could be fun too
- Sharing outcomes and reflections ( 1 hr ) [add link and time in different time zones]
    - Round of publications
    - Reflection on process
    - Feedback on ChattyPub
