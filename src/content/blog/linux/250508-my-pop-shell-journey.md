---
pubDate: 250508
title: My Pop Shell Journey
description: Getting Window Tiling into Linux/Ubuntu without tossing the whole broth out the window. A developer beginner guide on installing and how does it fare.
tags: ["PopShell","GNOME","TilingWM","Productivity"]
draft: 0
thumbnail: "/thumbnails/blog/250508-my-pop-shell-journey.svg" 
---


> [!tldr] **Journey into Tiling Window Managers: AwesomeWM vs Pop!\_OS Shell**
> 
> Exploring automated window tiling for improved productivity, my first attempted a standalone tiling window manager (AwesomeWM), finding it too disruptive as it replaced the entire desktop environment. I seek a less radical approach, adopted Pop!\_OS Shell, a GNOME extension that adds tiling functionality while preserving the existing environment. 
> 
> Although requiring installation and troubleshooting of keybinding conflicts, Pop!\_OS Shell offers a practical entry point into tiling for GNOME users, demonstrating that even integrating tiling requires technical comfort and adaptation, likely appealing more to experienced users than casual ones.

## My Pop Shell Journey

Recently, there's been an explosion of YouTubers talking about "Ricing" thanks to [PewDiePie advocating for Linux](https://www.youtube.com/watch?v=pVI_smLgTY0) (also shoutout to [James Lee](https://www.youtube.com/watch?v=lm51xZHZI6g) too!). Ricing is a process of deeply customizing a Linux OS to enhance its appearance and functionality, often involving significant configuration of applications and workflows.

![](/_assets/images/blog/wheez.png)

Beside looking pretty, some claim "IT WILL 10X YOUR PRODUCTIVITY" might be an overstatement, I found myself frequently snapping windows side-by-side, arranging my browser with ChatGPT next to my code editor, for instance. After a year of this manual snapping, I decided it was time to explore automated tiling window management for a more efficient workflow.

**Tiling Window Managers** – offer a eparture from traditional floating windows by automating their arrangement. I'm expecting a period of adjusting, and indeed, when I installed one of the popular one, it felt like getting stuck in VIM all over again. 

# First attempt: Standalone Tiling WM (AwesomeWM)


AwesomeWM is a well-regarded tiling window manager, but the transition from the default Ubuntu desktop environment (GNOME) was abrupt. None of my familiar keybindings or shortcuts worked. I had to rely on the mouse to open a little menu of apps and settings to navigate.

Even the "taskbar" panels, WiFi indicator, and battery display where gone. AwesomeWM had completely replaced the default GNOME appearance and controls, making even basic tasks like accessing network settings difficult.

It quickly became clear this approach wasn't suitable for my goal of sticking close to the default environment. I wasn't prepared to spend a week rebuilding my desktop functionality from scratch. While I believe the return on investment could be substantial with enough time and effort, I needed an alternative that extends, rather than replaced, my current setup.

## Pop!OS Shell

After reverting to GNOME, I sought alternatives and a somewhat surprising name came up: [Pop!\_OS Shell](https://github.com/pop-os/shell).

Originating from the Pop!\_OS Linux distribution, known for its out-of-the-box hardware support for AMD & Nvidia GPUs (hooray for Linux gamers), it also includes streamlined window and workspace management features. Conveniently, these features are also available as a GNOME Shell extension for Ubuntu.

To be direct, the installation process requires building from source, which was fairly straightforward ([installation guide](https://support.system76.com/articles/pop-shell/)). The main challenge lies in the conflicting keyboard shortcuts between Pop!\_OS Shell's bindings (such as `Super + Arrows` for focus/movement) and the default Ubuntu/GNOME shortcuts (which often use `Super + Arrows` for window snapping).

Resolving these conflicts involved some command-line steps to manage settings and troubleshoot unresponsive shortcuts. However, after understanding the underlying mechanics and what needed to be adjusted, I achieved a functional setup.

While Pop!\_OS Shell provides tiling upon installation, the customization options within the extension itself feel more limited compared to highly programmable window managers like AwesomeWM or xmonad. I find myself wanting window snapping to a certain degree but with no avail.

Integrating tiling into an existing Desktop Environment like GNOME isn't entirely plug-and-play; it requires specific installation steps and troubleshooting of keybinding conflicts with the underlying environment.

some good point just after a day of use:

- Automated Tiling!
- Ability to easily toggle Tile Windows on or off for temporary.
- All standard GNOME functionalities – including Settings, Network Manager GUI, notifications, and the file manager – remain fully accessible and integrated.

This preservation of the default environment makes the transition to using tiling much less intimidating for new users compared to a complete desktop overhaul.

Pop!\_OS Shell successfully adds the *functionality* of tiling without the *disruption* of replacing the entire DE. While its deep customization might be limited compared to others, it offers a more accessible entry point into tiled workflows for GNOME users.

### User Assessment and Learning Curve

As a beginner to tiling, the process of getting Pop!\_OS Shell set up still required a degree of tweaking and adaptation. While it avoids a "complete overhaul," adopting Pop!\_OS Shell demands some technical comfort and willingness to configure and adapt to a new system.

With this now installed and working, I plan to use this tiling system for the next year or two to develop and polish my workflow before potentially considering a more custom or complex solution.

## Conclusion

After experimenting with both a standalone Tiling Window Manager and an extension-based solution, I've concluded that even the less drastic approach is likely not suited for "casual users."

Anyone considering adding a tiling feature to their existing desktop should be prepared to tinker, adapt to a new workflow, and go beyond the typical user experience. However, I suspect that individuals exploring tiling are already seasoned tinkerers to begin with.

For now, I'm looking forward to using this new tiling feature and hope to report back on its impact on my productivity in near future.

---

[^1]: [[250508-Pop_OS Shell - Tiling for GNOME]]
[^2]:[[250509-My Pop Shell Journey - Exploring Tiling Window Managers]]