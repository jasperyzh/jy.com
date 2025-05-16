---
pubDate: 250508
title: Fix That Annoying Scroll Bug When Switching Apps on GNOME
description: Slowly and surely, eat an elephant, one bite at a time.
tags: "#Ubuntu #GNOME #Extension #LinuxTips #fixes"
draft: 0
thumbnail: "/thumbnails/blog/250508-Fix That Annoying Scroll Bug When Switching Apps on GNOME.svg" 
---

Hey Developers on Linux that uses GNOME!

Ever been happily scrolling through a long document, code, or website, switch to another app using Alt+Tab, and then the new app suddenly scrolls unexpectedly? Like a glitch or uncontrollable twitch? It's a frustrating little bug that can really break your flow.

This happens frequently when switching between apps like VS Code and Chrome on GNOME, but it can affect others too. Basically, sometimes leftover scroll signals from the first app "carry over" to the second one, causing a jarring jump.

/blog/images/wheez.png


![[wheez.png]]

Good news! There's a simple fix using a GNOME Shell Extension called **[Alt+Tab Scroll Workaround (GitHub)](https://github.com/lucasresck/gnome-shell-extension-alt-tab-scroll-workaround)**. This extension intercepts those rogue scroll events during window switches and stops them from affecting the next app.


> #### GNOME Shell Extension: Alt+Tab Scroll Workaround
> *Quick fix to the bug where scrolling in one application is repeated in another when switching between them using Alt+Tab (e.g., VS Code and Chrome).*
> 
> You could simply install the extension via: 
> https://extensions.gnome.org/extension/5282/alttab-scroll-workaround/

### Conclusion

Till this day I still not sure what causes this in the first place and fixing this bug with extension does not sit well with me, one day perhaps it will be gone when it upgraded to Wayland. Also this simple extension also shows how the community can help each other out on ironing little annoyances that make our Linux desktop life even better.

Happy scrolling — the way *you* intend to scroll!

---

[^1]: [[250225-Installing the Alt+Tab Scroll Workaround Extension]]
