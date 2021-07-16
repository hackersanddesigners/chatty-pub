# ChattyPub

ChattyPub is a design tool in the making – leveraging a chat interface to apply styles and formats to the content of a publication. ChattyPub is a collaborative publication/zine-making tool built on top of the chat platform [Zulip](https://chat.hackersanddesigners.nl). By sending messages, reacting with emoji and writing simple CSS style rules the publication can be collectively designed.

## Zulip

On Zulip, conversations are categorized into different "Streams", which are comparable to "channels" in other messaging services like Discord. Streams can be public or private and host conversations consisting of text, images, files, reactions, etc..

What differentiates Zulip from most messaging platforms is the way streams are sub-threaded. Zulip introduces the concept of "Topics", which, in the plainest terms, means that messages have subjects. When sending a message to a stream in Zulip, you can also specify the topic of the message and the stream automatically filters messages by their shared topics. If your message's topic doesn't exist yet, it will be created when you send your message.

Zulip allows you to react to messages using emoji's as well. We will make heavy use of emojis in ChattyPub.

There are several ways to engage with Zulip, including a web-client, a desktop app, and a mobile app.

## ChattyPub

http://chatty-pub.hackersanddesigners.nl

ChattyPub is a website that acts as a different interface to the same Zulip service. ChattyPub takes a stream from Zulip, combines messages into long-form articles and uses a design system combining Emojis and CSS syntax to style the messages, effectively turning the stream into a (printable!) webpage.

## Making a publication with Zulip & ChattyPub

### Content

1. Create a stream on Zulip
   - Ensure that either (1) the stream name starts with `pub-` or (2) the stream includes a topic called "rules" (more on that later).
   - Ensure that the stream is public.
2. Go to [ChattyPub](http://chatty-pub.hackersanddesigners.nl). The stream you created will be visible on the left-side navigation.
3. Click on your stream.
4. The main (middle) section of the website will have:
   1. Your stream name (which will be the name of your publication)
   2. The topics of your stream organized into a table of contents (which will act as "Chapters" in your publication)
   3. The topics, in alphabetical order, displaying their messages, in chronological order. 
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

These messages should be unique and follow the CSS syntax, as described in the [introduction to CSS](#CSS). If you are comfortable with CSS, you can skip to the part of the document that describes [how CSS is used in ChattyPub](https://github.com/hackersanddesigners/chatty-pub/blob/master/front/docs/CSS.md#css-in-chatty-pub).

To apply these styles to the contents of your publication, head back to any other topic in your stream, select a message you'd like to style, and react to it with the emoji whose styles you want to apply. On ChattyPub, the message should be rendered with these styles.

If you'd like to style only a part of a message, select the message in Zulip and quote and respond to it (in the 3-dot menu). This will produce a text in your input box on the bottom of the interface. Delete the parts of the quoted message that you don't want the styles applied to, and send your response. When you react with an emoji to your own response, the part of the original message you quoted will inherit the styles defined for that emoji.

Keep in mind that you can edit your own messages! So if you make a mistake (forgetting the semi-colon at the end of a statement is a common one), roll over your message and click the little pen at the top righthand side of the message.

### Printing

To print, click on the print button on the left side of the application. This will hide the interface, make all content visible and open the browsers' Printing dialog box.

There is more information on setting up pages sizes etc, in the CSS document.

> Regrettably support for [@page](https://caniuse.com/css-paged-media) is very poor in most browsers. Use MS Edge, Opera or Google Chrome for best results when printing or creating PDFs.
