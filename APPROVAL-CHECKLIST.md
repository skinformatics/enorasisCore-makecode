# Publication checklist (maintainers)

Internal guide for [MakeCode extension approval](https://makecode.microbit.org/extensions/approval).  
**Not required reading for students** — see [README.md](README.md).

## 14 steps

| # | Task | Status |
|---|------|--------|
| 1 | Classroom test on micro:bit v2 (e.g. `left` / `right` / `nothing`) | Done |
| 2 | Public repo root: [enorasisCore-makecode](https://github.com/skinformatics/enorasisCore-makecode) | Done |
| 3 | `LICENSE.txt` MIT | Done |
| 4 | `icon.png` 300x200, under 100 KB | Done |
| 5 | `test.ts` — all blocks, documented pass criteria | Done |
| 6 | `README.md` — English, API, `blocks` examples, product link | Done |
| 7 | `docs/*.md` block help + `//% help=` in `enorasisCore.ts` | Done |
| 8 | `pxt.json` `name` matches README `#` heading (`enorasis-core`) | Done |
| 9 | GitHub repo **About** description set | You |
| 10 | GitHub **Release** `v0.1.3` tag | You |
| 11 | Approval form: educational software + micro:bit v2 vision/ML story | You |
| 12 | micro:bit Slack `#makecode` (optional) | Optional |
| 13 | Submit [Extension Approval Form](https://form.jotform.com/90075019358357) | You |
| 14 | Wait for PR to `pxt-microbit` / gallery search | Wait |

## Form text (copy-paste)

**Repository:** https://github.com/skinformatics/enorasisCore-makecode  
**Release:** v0.1.3  
**Summary:** Official companion extension for [enorasisCore](https://enorasiscore.eu). Students train image classes in the browser (machine learning). Class labels are sent over BLE UART to BBC micro:bit v2 MakeCode blocks — giving vision-guided robotics without on-device neural networks. Classroom tested. MIT licensed.
