---
title: How to Configure GA4 Goals and Conversions
description: A Short guide on how to configure GA4 "Goals" and conversion. Setting up custom events and how to view it.
pubDate: 230618 
author: jyzh 
image:
  url: ""
  alt: "#"
tags: ["general", "webdev"]
draft: true

---

In Google Analytics 4 (GA4), the concept of 'goals' from Universal Analytics has been replaced with 'conversions'. This change in terminology reflects a shift in how we measure user success on our websites. Whether it's making a purchase, signing up for an account, or downloading an ebook, these actions can all be defined as conversions. But how do we set up these conversions in GA4? Let's dive in.

## Sending Events to Google Analytics 4
The first step in setting up conversions in GA4 is to send your event to GA4. An event could be anything that signifies user success on your website. For instance, if you have a contact form on your website, you might want to track form submissions as conversions. To do this, you need to send a 'form_submit' event to GA4.

The event you sent to GA4 may need to wait for 48 hours to show up. Once it does appears, you can mark it as a conversion by toggling the 'Mark as conversion' button.

## Creating a Custom Event
What if you want to track a page view as a conversion? For instance, you might want to track visits to a 'Thank You' page as conversions. In this case, you can create a custom event based on the 'page_view' event.

To create a custom event, go to the 'Create Event' section in GA4 and give your event a name. Then, set the event name to 'page\_view' and add a condition that the 'page\_location' contains 'thank you page'.

Once you've created your custom event, you need to wait for it to show up in your GA4 account. This can also take up to 48 hours. Once your custom event appears in your account, you can mark it as a conversion in the same way as before.

## Viewing Your Conversions
Once you've set up your conversions, you can view them in your GA4 reports. Under the 'Engagement' section, you'll find a 'Conversions' report that shows a graph of your conversions and a list of the conversions that have been counted.

You can also view your conversions in context by looking at other reports. For instance, in the 'User Acquisition' report, you can see where your users are coming from and how many of them are converting.

## Conclusion
Setting up conversions in GA4 involves sending events to GA4 and marking them as conversions. While this process requires some patience, it's crucial for measuring user success on your website. By tracking conversions, you can gain valuable insights into your users' behavior and make data-driven decisions to improve your website.

---

**source:** [How to Configure GA4 Goals and Conversions - MeasureSchool](https://www.youtube.com/watch?v=G-UWyCMnTsU)