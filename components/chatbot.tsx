'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, Send, X, Bot, User, Sparkles, HelpCircle, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  sender: 'user' | 'bot'
  text: string
  timestamp: Date
}

interface IntentResponse {
  keywords: string[]
  reply: string
}

const FAQ_INTENTS: IntentResponse[] = [
  {
    keywords: ['hello', 'hi', 'hey', 'greetings', 'who are you', 'help'],
    reply: "Hello! 👋 I'm your PixelForge AI Assistant. How can I assist you today? I'm ready to answer any questions about our advanced AI models, pricing tiers, API features, or how to get started generating images!"
  },
  {
    keywords: ['pricing', 'plans', 'cost', 'starter', 'professional', 'enterprise', 'free', 'price', 'subscription', 'buy', 'checkout'],
    reply: "We offer three simple, transparent pricing tiers designed for different levels of creators:\n\n• **Starter (Free)**: Perfect for exploring. You get **10 monthly credits** for standard quality generations and community support.\n• **Professional ($49/mo or $39/mo billed annually)**: Our most popular plan! Offers **1,000 monthly credits**, premium quality, full API access, and priority support.\n• **Enterprise (Custom)**: For high-volume production. Offers **unlimited credits**, enterprise quality, 24/7 dedicated support, custom fine-tuned models, and SLA guarantees.\n\nAll paid plans come with a **14-day free trial** and require no credit card to start!"
  },
  {
    keywords: ['model', 'models', 'phoenix', 'quantum', 'nova', 'ai model', 'differences', 'compare'],
    reply: "PixelForge features three state-of-the-art AI generation models:\n\n• **Phoenix Pro (Default)**: Our flagship model. It delivers exceptional quality, highly detailed textures, and rich colors. Great for final art. Cost: **$0.04/image**.\n• **Quantum Ultra**: Our speed-optimized high-quality model. Great for rapid styling and concepts. Cost: **$0.02/image**.\n• **Nova Light**: Our fastest model. Delivers good quality instantly. Perfect for prototyping prompts. Cost: **$0.01/image**.\n\nYou can easily select and compare these models directly inside the Prompt Demo section!"
  },
  {
    keywords: ['api', 'integration', 'developer', 'webhook', 'connect', 'rest', 'documentation', 'code', 'endpoint', 'generate'],
    reply: "Yes, PixelForge has full developer API support! Both the Professional and Enterprise plans grant full access to our REST API.\n\nKey features include:\n• Programmatic image generation via POST requests to `/api/generate`.\n• Webhooks for async batch generation notifications.\n• Integration configurations. You can find detailed JSON payloads, status codes, and code examples in our [Integration Documentation](file:///d:/AI%20Text-to-Image%20Platform/BACKEND_INTEGRATION.md)."
  },
  {
    keywords: ['quality', 'resolution', 'sizes', 'standard', 'excellent', 'ultra', 'size', 'aspect ratio'],
    reply: "We support multiple customizable quality and resolution options:\n\n• **Resolutions**: 512x512, 768x768, 1024x1024 (default), and 1536x1536.\n• **Quality Levels**: Standard (1x multiplier), Excellent (1.5x, default), and Ultra (2x).\n\nChanging these settings applies a cost multiplier. For example, generating a 512x512 image halves the credit cost, while a 1536x1536 image increases it."
  },
  {
    keywords: ['how to use', 'prompt', 'demo', 'generate image', 'get started', 'steps'],
    reply: "Generating images is super easy on PixelForge!\n\n1. Scroll down to the **'See It In Action: Try Our Prompt Demo'** section.\n2. Choose one of our three models (e.g. **Phoenix Pro**).\n3. Pick your desired quality setting (Standard, Excellent, or Ultra).\n4. Type your creative prompt in the text area (or click **'Shuffle'** / a quick example for inspiration).\n5. Click **'Generate'** to view your high-resolution artwork instantly!"
  },
  {
    keywords: ['security', 'safe', 'gdpr', 'hipaa', 'soc 2', 'compliance', 'privacy', 'encrypt'],
    reply: "Privacy and security are our top priorities. PixelForge implements bank-level encryption (SSL over all requests) and is fully compliant with **GDPR, HIPAA, and SOC 2** standards. Your uploaded prompts, generation logs, and metadata are kept completely private and secure."
  }
]

const DEFAULT_REPLY = "I'm here to help you get the most out of PixelForge AI! ⚡ While I might not have a direct answer for that specific question, I can tell you all about:\n\n• **Our AI Models** (Phoenix Pro, Quantum Ultra, Nova Light)\n• **Pricing Plans & Subscriptions** (Starter, Professional, Enterprise)\n• **Developer API Integration & Webhooks**\n• **Resolutions & Quality Cost Multipliers**\n• **How to use our Prompt Generator Demo**\n\nWhat would you like to explore?"

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Initialize with welcome message if empty
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          sender: 'bot',
          text: "Hi there! Welcome to PixelForge AI. ⚡ How can I help you explore our image generation platform today?",
          timestamp: new Date()
        }
      ])
    }
  }, [messages])

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const classifyIntent = (input: string): string => {
    const cleanInput = input.toLowerCase().trim()
    
    // Check FAQ intents
    for (const intent of FAQ_INTENTS) {
      for (const keyword of intent.keywords) {
        if (cleanInput.includes(keyword)) {
          return intent.reply
        }
      }
    }

    return DEFAULT_REPLY
  }

  const handleSend = (text: string) => {
    if (!text.trim()) return

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp: new Date()
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate natural AI thinking delay and typing effect
    setTimeout(() => {
      const replyText = classifyIntent(text)
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: replyText,
        timestamp: new Date()
      }
      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1200)
  }

  const suggestionChips = [
    { label: 'Compare AI Models', query: 'Tell me about the models' },
    { label: 'Pricing Plans & Costs', query: 'What are the pricing plans?' },
    { label: 'API Access', query: 'How does the developer API work?' },
    { label: 'Security & Compliance', query: 'Is PixelForge secure?' }
  ]

  // Render text with markdown bolding support
  const renderMessageText = (text: string) => {
    return text.split('\n').map((line, lineIdx) => {
      // Parse markdown bold text **bold**
      const parts = line.split(/(\*\*[^*]+\*\*)/g)
      return (
        <p key={lineIdx} className={cn("text-sm leading-relaxed", lineIdx > 0 && "mt-1.5")}>
          {parts.map((part, partIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={partIdx} className="font-semibold text-white">{part.slice(2, -2)}</strong>
            }
            return part
          })}
        </p>
      )
    })
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="w-[380px] sm:w-[420px] max-w-[calc(100vw-2rem)] h-[560px] max-h-[80vh] bg-[#0c0c12]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(139,92,246,0.15)] flex flex-col overflow-hidden mb-4 group/window"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-primary/20 via-accent/10 to-secondary/20 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-lg bg-gradient-accent flex items-center justify-center overflow-hidden">
                  <Bot className="w-5 h-5 text-white" />
                  <div className="absolute inset-0 bg-white/20 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    PixelForge Assistant
                    <Sparkles className="w-3.5 h-3.5 text-accent animate-pulse" />
                  </h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-[10px] text-muted-foreground font-medium">Online & Ready</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-white transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/5">
              {messages.map((msg) => {
                const isBot = msg.sender === 'bot'
                return (
                  <div
                    key={msg.id}
                    className={cn(
                      "flex items-start gap-2.5 max-w-[85%]",
                      isBot ? "self-start" : "self-end ml-auto flex-row-reverse"
                    )}
                  >
                    {/* Avatar */}
                    <div
                      className={cn(
                        "w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-white",
                        isBot ? "bg-gradient-accent" : "bg-white/10 border border-white/10"
                      )}
                    >
                      {isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                    </div>

                    {/* Bubble */}
                    <div
                      className={cn(
                        "p-3.5 rounded-2xl text-foreground text-sm",
                        isBot
                          ? "bg-white/5 border border-white/5 rounded-tl-sm text-white/95"
                          : "bg-gradient-accent text-white rounded-tr-sm shadow-md shadow-accent/10"
                      )}
                    >
                      {renderMessageText(msg.text)}
                    </div>
                  </div>
                )
              })}

              {/* Bot Typing Indicator */}
              {isTyping && (
                <div className="flex items-start gap-2.5 max-w-[80%] self-start">
                  <div className="w-7 h-7 rounded-lg bg-gradient-accent flex items-center justify-center text-white flex-shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-white/5 border border-white/5 rounded-2xl rounded-tl-sm p-4 flex items-center gap-1.5 h-[38px]">
                    <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions Chips */}
            {messages.length === 1 && !isTyping && (
              <div className="p-4 pt-0 border-t border-transparent space-y-2">
                <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider block mb-2 px-1">Suggested Questions</span>
                <div className="flex flex-wrap gap-2">
                  {suggestionChips.map((chip, index) => (
                    <button
                      key={index}
                      onClick={() => handleSend(chip.query)}
                      className="px-3 py-1.5 rounded-lg border border-white/5 hover:border-accent/30 bg-white/5 hover:bg-accent/10 text-xs text-muted-foreground hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>{chip.label}</span>
                      <ArrowRight className="w-3 h-3 opacity-60 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Footer Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSend(inputValue)
              }}
              className="p-4 border-t border-white/5 bg-[#0a0a0f] flex items-center gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about AI models, pricing, API..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all placeholder:text-muted-foreground"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="p-2.5 rounded-xl bg-gradient-accent text-white hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-0.5 transition-all disabled:opacity-40 disabled:pointer-events-none disabled:shadow-none cursor-pointer flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="w-14 h-14 rounded-full bg-gradient-accent flex items-center justify-center text-white shadow-xl shadow-accent/20 hover:shadow-accent/40 border border-white/10 cursor-pointer relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <MessageSquare className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-primary animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}
