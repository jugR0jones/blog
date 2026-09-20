---
title: Unity Audio Buffer Size Fix
slug: unity-audio-buffer-size
date: 2026-09-20
summary: Resolving warbling and distorting sounds in a production environment by adjusting the audio buffer size to Best Latency.
tags: unity, audio, production
---

# The Problem

Certain sounds were warbling or sounding distorting when played in production environment of a Unity project. The sounds appeared to play correctly in play mode.

# Solution

Under certain circumstances the audio buffer can take longer to process, leading to sounds that don't sound correct. In this case the solution was to change the audio buffer size in Unity's audio settings to **Best Latency**.

## Steps

1. In Unity, go to **Edit > Project Settings**
2. Select the **Audio** category
3. Find the **Buffer Size** setting
4. Change from **Default** (or **Best Performance**) to **Best Latency**

## Why This Works

The **Best Latency** setting sets the buffer size to a smaller value. This improves the chances the buffer will be processed correctly at runtime.

## Other Considerations

- Doppler effects on each AudioSource can potentially cause the sounds to play differently, particular if the positions of the AudioSources change rapidly. An assumption was made that this would affect all sounds on the object, however only certain sounds were affected.
- Poor quality sound files. Sound files from a different project were used but the results were similar.