import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { a as MessageCircle, c as ListChecks, d as FileText, f as CircleAlert, h as ArrowRight, i as Sparkle, l as Lightbulb, m as BookOpen, n as User, o as Menu, p as Bot, r as Target, s as LoaderCircle, t as X, u as GraduationCap } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CdaXOxzB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var API_BASE = "https://edugenie-backend-l1u1.onrender.com";
function extractText(data) {
	if (typeof data === "string") return data;
	if (data && typeof data === "object") {
		const obj = data;
		for (const field of [
			"answer",
			"response",
			"result",
			"quiz",
			"summary",
			"explanation",
			"recommendation",
			"plan",
			"text",
			"output",
			"message"
		]) {
			const value = obj[field];
			if (typeof value === "string" && value.trim()) return value;
		}
		for (const value of Object.values(obj)) if (typeof value === "string" && value.trim()) return value;
	}
	try {
		return JSON.stringify(data, null, 2);
	} catch {
		return String(data);
	}
}
async function callApi(endpoint, params) {
	const query = new URLSearchParams();
	Object.entries(params).forEach(([key, value]) => {
		if (value !== void 0 && value !== null) query.set(key, String(value));
	});
	const url = `${API_BASE}/${endpoint}?${query.toString()}`;
	try {
		const response = await fetch(url, {
			method: "GET",
			headers: { Accept: "application/json, text/plain, */*" }
		});
		if (!response.ok) {
			let errorMessage = `Request failed with HTTP ${response.status}`;
			try {
				const errorData = await response.json();
				if (errorData && typeof errorData === "object") {
					const errorObject = errorData;
					if (typeof errorObject.detail === "string") errorMessage = errorObject.detail;
					else if (typeof errorObject.message === "string") errorMessage = errorObject.message;
				}
			} catch {}
			throw new Error(errorMessage);
		}
		return extractText((response.headers.get("content-type") || "").includes("application/json") ? await response.json() : await response.text());
	} catch (error) {
		if (error instanceof Error) throw error;
		throw new Error("Unable to connect to the EduGenie backend.");
	}
}
var StatusCtx = (0, import_react.createContext)(() => {});
var NAV = [
	["Dashboard", "dashboard"],
	["Ask AI", "ask"],
	["Quiz", "quiz"],
	["Summarize", "summarize"],
	["Explain", "explain"],
	["Learning Plan", "plan"]
];
function Index() {
	const [status, setStatus] = (0, import_react.useState)("checking");
	(0, import_react.useEffect)(() => {
		fetch(API_BASE + "/", { method: "GET" }).then(() => setStatus("online")).catch(() => setStatus("offline"));
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(StatusCtx.Provider, {
		value: setStatus,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, { status }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, { status }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Features, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-6xl space-y-16 px-4 py-16 sm:px-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AskSection, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuizSection, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummarizeSection, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExplainSection, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlanSection, {})
					]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
function StatusPill({ status }) {
	const [dot, label] = {
		checking: ["bg-muted-foreground", "Checking AI…"],
		online: ["bg-success", "Gemini AI Connected"],
		offline: ["bg-destructive", "AI Temporarily Unavailable"]
	}[status];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs font-medium",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "relative flex h-2 w-2",
			children: [status === "online" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `absolute inline-flex h-full w-full animate-ping rounded-full ${dot} opacity-60` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `relative inline-flex h-2 w-2 rounded-full ${dot}` })]
		}), label]
	});
}
function Header({ status }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-40 border-b bg-card/80 backdrop-blur",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: "#dashboard",
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid h-9 w-9 place-items-center rounded-xl bg-brand text-primary-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "h-5 w-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "leading-tight",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block font-bold",
							children: "EduGenie"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-[11px] text-muted-foreground",
							children: "AI Learning Assistant"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden items-center gap-1 lg:flex",
					children: NAV.map(([l, id]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: `#${id}`,
						className: "rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-secondary-foreground",
						children: l
					}, id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden sm:block",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid h-9 w-9 place-items-center rounded-full bg-secondary text-secondary-foreground",
							"aria-label": "Profile",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-4 w-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "grid h-10 w-10 place-items-center rounded-lg border lg:hidden",
							onClick: () => setOpen(!open),
							"aria-label": "Toggle menu",
							children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" })
						})
					]
				})
			]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
			className: "animate-in fade-in slide-in-from-top-2 border-t bg-card px-4 py-3 lg:hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-2 sm:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status })
			}), NAV.map(([l, id]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: `#${id}`,
				onClick: () => setOpen(false),
				className: "block rounded-lg px-3 py-3 text-sm font-medium hover:bg-secondary",
				children: l
			}, id))]
		})]
	});
}
function Hero({ status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "dashboard",
		className: "relative overflow-hidden border-b bg-hero",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 md:py-20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "animate-in fade-in slide-in-from-bottom-3 duration-500",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl",
						children: ["Learn Smarter ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-brand",
							children: "with AI"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-lg text-muted-foreground",
						children: "Ask questions, understand difficult concepts, practice with quizzes, summarize study material, and create personalized learning plans with AI."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-7 flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "#ask",
							className: "inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lift transition-transform hover:-translate-y-0.5",
							children: ["Start Learning ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#features",
							className: "inline-flex items-center rounded-xl border bg-card px-5 py-3 text-sm font-semibold transition-colors hover:bg-secondary",
							children: "Explore Features"
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto hidden h-72 w-full max-w-sm md:block",
				"aria-hidden": true,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-6 rounded-3xl bg-brand opacity-90 shadow-lift" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-6 grid place-items-center rounded-3xl text-primary-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, {
							className: "h-24 w-24 opacity-90",
							strokeWidth: 1.25
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute -left-2 top-4 flex items-center gap-2 rounded-xl border bg-card px-3 py-2 text-xs font-medium shadow-soft",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListChecks, { className: "h-4 w-4 text-primary" }), " Quiz ready · 5 Qs"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute -right-2 top-1/2 flex items-center gap-2 rounded-xl border bg-card px-3 py-2 text-xs font-medium shadow-soft",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightbulb, { className: "h-4 w-4 text-violet" }), " Explained simply"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute bottom-2 left-8 flex items-center gap-2 rounded-xl border bg-card px-3 py-2 text-xs font-medium shadow-soft",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "h-4 w-4 text-success" }), " Week 1 plan"]
					})
				]
			})]
		})
	});
}
var FEATURES = [
	{
		icon: MessageCircle,
		t: "Smart Q&A",
		d: "Ask any educational question and get an AI-powered answer.",
		b: "Ask a Question",
		id: "ask"
	},
	{
		icon: ListChecks,
		t: "Quiz Generator",
		d: "Generate practice questions from any topic.",
		b: "Generate Quiz",
		id: "quiz"
	},
	{
		icon: Lightbulb,
		t: "Simple Explanation",
		d: "Understand complex concepts in simple language.",
		b: "Explain Topic",
		id: "explain"
	},
	{
		icon: BookOpen,
		t: "Text Summarizer",
		d: "Turn long educational passages into concise summaries.",
		b: "Summarize Text",
		id: "summarize"
	},
	{
		icon: Target,
		t: "Learning Plan",
		d: "Create a personalized study plan based on your subject and level.",
		b: "Create Plan",
		id: "plan"
	}
];
function Features() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "features",
		className: "mx-auto max-w-6xl px-4 pt-14 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-2xl font-bold",
				children: "Dashboard Overview"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Pick a tool to get started."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5",
				children: FEATURES.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "group flex flex-col rounded-2xl border bg-card p-5 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:shadow-lift",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid h-11 w-11 place-items-center rounded-xl bg-secondary text-primary transition-colors group-hover:bg-brand group-hover:text-primary-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(f.icon, { className: "h-5 w-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-4 font-semibold",
							children: f.t
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 flex-1 text-sm text-muted-foreground",
							children: f.d
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: `#${f.id}`,
							className: "mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary",
							children: [
								f.b,
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-1" })
							]
						})
					]
				}, f.id))
			})
		]
	});
}
function useTool(endpoint) {
	const setStatus = (0, import_react.useContext)(StatusCtx);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [result, setResult] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	const run = async (params) => {
		if (Object.values(params).some((v) => !v.trim())) {
			setError("Please check your input and try again.");
			return;
		}
		setLoading(true);
		setError(null);
		try {
			const text = await callApi(endpoint, params);
			setResult(text);
			setStatus("online");
		} catch (e) {
			console.error(`[EduGenie] /${endpoint} failed:`, e);
			const network = e instanceof TypeError;
			if (network) setStatus("offline");
			setError(network ? "EduGenie couldn't connect to the AI service. Please try again." : "Something went wrong. Please try again.");
		} finally {
			setLoading(false);
		}
	};
	return {
		loading,
		result,
		error,
		run
	};
}
function Section({ id, icon: Icon, title, desc, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id,
		className: "grid gap-6 lg:grid-cols-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "lg:col-span-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "grid h-11 w-11 place-items-center rounded-xl bg-accent text-accent-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-2xl font-bold",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-muted-foreground",
					children: desc
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-4 lg:col-span-3",
			children
		})]
	});
}
var fieldCls = "w-full rounded-xl border border-input bg-card px-4 py-3 text-sm shadow-soft outline-none transition focus:border-ring focus:ring-4 focus:ring-ring/15";
function SubmitButton({ loading, label, loadingLabel }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "submit",
		disabled: loading,
		className: "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift disabled:translate-y-0 disabled:opacity-70",
		children: [loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), loading ? loadingLabel : label]
	});
}
function ResultCard({ icon, title, badge, loading, error, result, empty, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border bg-card p-5 shadow-soft",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "flex items-center gap-2 font-semibold",
					children: [icon, title]
				}), badge && result && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rounded-full bg-secondary px-2.5 py-1 text-[11px] font-semibold text-secondary-foreground",
					children: badge
				})]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mb-3 flex items-center gap-2 rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-4 w-4" }), error]
			}),
			loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2",
				"aria-busy": true,
				children: [
					90,
					75,
					82,
					60
				].map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-3 animate-pulse rounded bg-muted",
					style: { width: `${w}%` }
				}, w))
			}) : result ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "animate-in fade-in slide-in-from-bottom-2 duration-300",
				children: children ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Prose, { text: result })
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "py-6 text-center text-sm text-muted-foreground",
				children: empty
			})
		]
	});
}
/** Light markdown-ish rendering of AI text: headings, bullets, bold. */
function Prose({ text }) {
	const lines = text.split("\n");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-2 text-[15px] leading-relaxed",
		children: lines.map((raw, i) => {
			const line = raw.trimEnd();
			if (!line.trim()) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-1" }, i);
			const h = line.match(/^#{1,4}\s+(.*)/);
			if (h) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
				className: "pt-2 font-semibold text-primary",
				children: inline(h[1] ?? "")
			}, i);
			const b = line.match(/^\s*[-*•]\s+(.*)/);
			if (b) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "flex gap-2 pl-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: inline(b[1] ?? "") })]
			}, i);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: inline(line) }, i);
		})
	});
}
function inline(s) {
	return s.split(/(\*\*[^*]+\*\*)/g).map((p, i) => p.startsWith("**") && p.endsWith("**") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
		className: "font-semibold",
		children: p.slice(2, -2)
	}, i) : p);
}
function AskSection() {
	const [q, setQ] = (0, import_react.useState)("");
	const t = useTool("ask");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
		id: "ask",
		icon: MessageCircle,
		title: "Ask EduGenie",
		desc: "Ask anything related to your studies.",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: (e) => {
				e.preventDefault();
				t.run({ question: q });
			},
			className: "space-y-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				value: q,
				onChange: (e) => setQ(e.target.value),
				rows: 4,
				placeholder: "Example: Explain Artificial Intelligence in simple words.",
				className: fieldCls
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubmitButton, {
				loading: t.loading,
				label: "Ask EduGenie",
				loadingLabel: "Thinking..."
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultCard, {
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { className: "h-5 w-5 text-primary" }),
			title: "EduGenie Answer",
			empty: "Your AI answer will appear here.",
			...t
		})]
	});
}
function QuizSection() {
	const [topic, setTopic] = (0, import_react.useState)("");
	const t = useTool("quiz");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
		id: "quiz",
		icon: ListChecks,
		title: "Quiz Generator",
		desc: "Test your knowledge with AI-generated questions.",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: (e) => {
				e.preventDefault();
				t.run({ topic });
			},
			className: "flex flex-col gap-3 sm:flex-row",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value: topic,
				onChange: (e) => setTopic(e.target.value),
				placeholder: "Example: Python Programming",
				className: fieldCls
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubmitButton, {
				loading: t.loading,
				label: "Generate Quiz",
				loadingLabel: "Generating Quiz..."
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultCard, {
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListChecks, { className: "h-5 w-5 text-primary" }),
			title: "Your Quiz",
			badge: "AI Generated Quiz",
			empty: "Your generated quiz will appear here.",
			...t,
			children: t.result && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuizView, { text: t.result })
		})]
	});
}
function QuizView({ text }) {
	const blocks = text.split(/\n(?=\s*(?:\*\*)?\s*(?:Q(?:uestion)?\s*\d+|\d+[.)])\s*)/i).map((b) => b.trim()).filter(Boolean);
	if (blocks.length < 2) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Prose, { text });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-3",
		children: blocks.map((b, i) => {
			const lines = b.split("\n").map((l) => l.trim()).filter(Boolean);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-xl border bg-muted/50 p-4",
				children: lines.map((l, j) => {
					const clean = l.replace(/\*\*/g, "");
					if (j === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-semibold",
						children: clean
					}, j);
					if (/^(correct\s*)?answer/i.test(clean)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 inline-block rounded-lg bg-success/15 px-2.5 py-1 text-sm font-semibold text-success",
						children: clean
					}, j);
					if (/^[A-D][.)]/.test(clean)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1.5 rounded-lg bg-card px-3 py-1.5 text-sm",
						children: clean
					}, j);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm",
						children: clean
					}, j);
				})
			}, i);
		})
	});
}
function SummarizeSection() {
	const [text, setText] = (0, import_react.useState)("");
	const t = useTool("summarize");
	const words = text.trim() ? text.trim().split(/\s+/).length : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
		id: "summarize",
		icon: BookOpen,
		title: "Text Summarizer",
		desc: "Paste your study material and let EduGenie create a concise summary.",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: (e) => {
				e.preventDefault();
				t.run({ text });
			},
			className: "space-y-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				value: text,
				onChange: (e) => setText(e.target.value),
				rows: 8,
				placeholder: "Paste your educational text here...",
				className: fieldCls
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-xs text-muted-foreground",
					children: [
						words,
						" words · ",
						text.length,
						" characters"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubmitButton, {
					loading: t.loading,
					label: "Summarize Text",
					loadingLabel: "Summarizing..."
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultCard, {
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-5 w-5 text-primary" }),
			title: "Summary",
			empty: "Your summary will appear here.",
			...t
		})]
	});
}
function ExplainSection() {
	const [topic, setTopic] = (0, import_react.useState)("");
	const t = useTool("explain");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
		id: "explain",
		icon: Lightbulb,
		title: "Explain Simply",
		desc: "Turn difficult concepts into easy-to-understand explanations.",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: (e) => {
				e.preventDefault();
				t.run({ topic });
			},
			className: "flex flex-col gap-3 sm:flex-row",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value: topic,
				onChange: (e) => setTopic(e.target.value),
				placeholder: "Example: Polymorphism in Java",
				className: fieldCls
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubmitButton, {
				loading: t.loading,
				label: "Explain Simply",
				loadingLabel: "Explaining..."
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultCard, {
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightbulb, { className: "h-5 w-5 text-violet" }),
			title: "Simple Explanation",
			empty: "Your explanation will appear here.",
			...t
		})]
	});
}
function PlanSection() {
	const [subject, setSubject] = (0, import_react.useState)("");
	const [level, setLevel] = (0, import_react.useState)("");
	const t = useTool("recommend");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
		id: "plan",
		icon: Target,
		title: "Personalized Learning Plan",
		desc: "Tell EduGenie what you want to learn and your current level.",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: (e) => {
				e.preventDefault();
				t.run({
					subject,
					level
				});
			},
			className: "space-y-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: subject,
					onChange: (e) => setSubject(e.target.value),
					placeholder: "Example: Python",
					className: fieldCls,
					"aria-label": "Subject"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: level,
					onChange: (e) => setLevel(e.target.value),
					placeholder: "Example: Beginner",
					className: fieldCls,
					"aria-label": "Level"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubmitButton, {
				loading: t.loading,
				label: "Create Learning Plan",
				loadingLabel: "Creating Plan..."
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultCard, {
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "h-5 w-5 text-success" }),
			title: "Your Learning Plan",
			empty: "Your personalized learning plan will appear here.",
			...t
		})]
	});
}
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "border-t bg-card",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 py-10 text-center sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "flex items-center gap-2 font-bold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "h-5 w-5 text-primary" }), " EduGenie"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Google Gemini Powered Learning Assistant"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "flex items-center gap-1.5 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkle, { className: "h-3 w-3" }), " Built for students • Learn • Practice • Understand • Improve"]
				})
			]
		})
	});
}
//#endregion
export { Index as component };
