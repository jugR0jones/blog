---
title: AI Server Set Up
slug: ai-server-set-up
date: 2026-09-09
summary: Documenting the set up of my AI server
tags: hardware, linux, gpu, amd, amd ai 9 hx470
---

# Hardware

- AMD Ryzen AI 9 HX470 with 64Gb RAM
- AMD Radeon 890M
- Code name: Gorgon Point

See: https://www.amd.com/en/products/processors/laptop/ryzen/ai-400-series/amd-ryzen-ai-9-hx-470.html

# Configure Memory

Reduce the reserved memory allocation for the GPU to a minimum to prevent out-of-memory (OOM) errors occuring.

This is an APU with a unified memory architecture, the gpu and system memory use the same RAM. Reducing the reserved memory for the GPU ensures there is enough memory for the model and operating system. This may not work well for systems that do not have a unified memory architecture.

## Configure Shared Memory In BIOS

### Reduce Reserved Memory For GPU To Minimum
TODO: Get the exact terms and menus

### Ensure BAR Is Enabled

## Configure GRUB For Extended GPU Memory

Open /etc/default/grub using a text editor with root privileges:
```javascript
sudo nano /etc/default/grub
```

Add the ttm memory pool parameters to the command line. 8388608 is the number of 4KB pages to give 32KB.
```javascript
GRUB_CMDLINE_LINUX_DEFAULT="quiet splash ttm.pages_limit=8388608 ttm.page_pool_size=8388608 amdttm.pages_limit=8388608 amdttm.page_pool_size=8388608"
```
NOTE: amdttm should be used on older kernels. It is included because it for robustness.

TODO: Add a table of values to make it easier to avoid calculating values

### amdgpu.gttsize=126976
Allocates system ram to the Graphics Translation Table (GTT).

By default, the AMD driver sets the GTT size to only 50% or 75% of your total system RAM. Manually increasing this limit helps prevent out-of-memory (OOM) errors during large compute tasks by allowing the GPU to spill over into a larger portion of your system's RAM.

Math: 124 GB * 1024 = 126976

| Memory Size (Gb) | Value  |
| ---------------- | ------ |
|               48 |  49152 |
|               64 |  65536 |
|              124 | 126976 |


TODO: Investigate amdgpu.gartsize=2048

## Other Options That Have Been Suggested

### amd_iommu=of
Force-enables the AMD IOMMU driver, or force-disables it in this case.

It translates DMA addresses into physical memory addresses using page tables that the operating system controls.

Disabling this potentially opens the system up to memory attacks but may improve performance.

This requires a BIOS change as well.

See: https://askubuntu.com/questions/1552302/implications-of-setting-amd-iommu-off

### iommu=pt
Enables Passthrough mode. This prevents the driver from touching devices that aren't being explicitly passed to a virtual machine, optimising performance.

This requires a BIOS change as well.

See: https://askubuntu.com/questions/841390/amd-system-fresh-install-only-usb-3-working-iommu

### amdgpu.vm_fragment_size=9
Enables large page support.

Historically it was recommended to set this parameter but on modern apus it is not recommended. This could result in suboptimal allocation or wasted TLB cache lines.

The syntax of this module parameter is amdgpu.vm_fragment_size=X, where the actual fragment size is 4KB * 2^X. The default is X=4, which means 64KB. To get 2MB fragments, set X=9.

See: https://www.amd.com/en/resources/support-articles/release-notes/RN-PRORAD-LIN-AMDGPUPRO-17-40.html

- Default (-1): The driver automatically optimizes the page fragment allocation based on your specific APU model and hardware layout.
- Value 4: Results in 64 KB fragments (4 KB × 2⁴).
- Value 9: Results in 2 MB fragments (4 KB × 2⁹).

## Update GRUB
```javascript
sudo update-grub
sudo reboot
```

## Verify Change
```javascript
cat /proc/cmdline
```

You should see the settings above in the output.

## Getting Started

Vue.js is a powerful framework for building user interfaces. This blog is built with Vue 3 and Vite, making it fast and efficient.

```javascript
const message = 'Hello, World!';
console.log(message);
```

I hope you enjoy reading my content!
