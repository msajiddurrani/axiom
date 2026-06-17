/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, DollarSign, TrendingUp, Briefcase, Plus, Search, Filter, 
  Trash2, LogOut, Calendar, PlusCircle, CheckCircle, FileText, 
  Phone, Mail, MessageSquare, MapPin, Tag, Check, CheckSquare, 
  Clock, Award, Activity, RotateCcw, AlertCircle, Edit, Info
} from 'lucide-react';
import { Contact, Deal, Interaction, Task, CRMData } from '../types';

// Pre-loaded high-fidelity mock CRM data
const INITIAL_CRM_DATA: CRMData = {
  contacts: [
    {
      id: 'c-1',
      name: 'Olivia Vance',
      email: 'olivia.vance@auroracloud.io',
      phone: '+1 (555) 234-5678',
      company: 'Aurora Cloud Corp',
      avatarColor: 'from-neutral-600 to-neutral-800',
      status: 'Negotiation',
      dealValue: 75000,
      lastInteractionDate: '2026-06-12',
      tags: ['SaaS', 'High-Tier', 'APAC']
    },
    {
      id: 'c-2',
      name: 'Marcus Brody',
      email: 'm.brody@heliox.tech',
      phone: '+1 (555) 876-5432',
      company: 'Heliox Technologies',
      avatarColor: 'from-neutral-700 to-neutral-900',
      status: 'Won',
      dealValue: 120000,
      lastInteractionDate: '2026-06-15',
      tags: ['Hardware', 'Key-Account', 'North-America']
    },
    {
      id: 'c-3',
      name: 'Elena Rostova',
      email: 'e.rostova@cyberdynesystems.com',
      phone: '+49 89 2019 451',
      company: 'Cyberdyne Systems',
      avatarColor: 'from-neutral-500 to-neutral-700',
      status: 'Proposal',
      dealValue: 45000,
      lastInteractionDate: '2026-06-10',
      tags: ['AI-Consulting', 'EU']
    },
    {
      id: 'c-4',
      name: 'Devon Lane',
      email: 'devon@zephyr.co',
      phone: '+1 (555) 345-6789',
      company: 'Zephyr Creative Group',
      avatarColor: 'from-neutral-800 to-neutral-950',
      status: 'Contacted',
      dealValue: 28000,
      lastInteractionDate: '2026-06-14',
      tags: ['Marketing', 'Mid-Market']
    },
    {
      id: 'c-5',
      name: 'Kristin Watson',
      email: 'kristin.w@bluegrid.org',
      phone: '+1 (555) 890-1234',
      company: 'BlueGrid Foundation',
      avatarColor: 'from-neutral-400 to-neutral-600',
      status: 'Lead',
      dealValue: 15000,
      lastInteractionDate: '2026-06-08',
      tags: ['Non-Profit', 'Inbound']
    }
  ],
  deals: [
    {
      id: 'd-1',
      title: 'Enterprise Sync Licensing',
      contactId: 'c-1',
      contactName: 'Olivia Vance',
      company: 'Aurora Cloud Corp',
      value: 75000,
      stage: 'Negotiation',
      probability: 75,
      expectedCloseDate: '2026-07-15'
    },
    {
      id: 'd-2',
      title: 'Holographic Display Stack Contract',
      contactId: 'c-2',
      contactName: 'Marcus Brody',
      company: 'Heliox Technologies',
      value: 120000,
      stage: 'Won',
      probability: 100,
      expectedCloseDate: '2026-06-25'
    },
    {
      id: 'd-3',
      title: 'Autonomous Pipeline Setup Pilot',
      contactId: 'c-3',
      contactName: 'Elena Rostova',
      company: 'Cyberdyne Systems',
      value: 45000,
      stage: 'Proposal',
      probability: 50,
      expectedCloseDate: '2026-08-01'
    },
    {
      id: 'd-4',
      title: 'Brand Identity Consulting Strategy',
      contactId: 'c-4',
      contactName: 'Devon Lane',
      company: 'Zephyr Creative Group',
      value: 28000,
      stage: 'Contacted',
      probability: 30,
      expectedCloseDate: '2026-09-10'
    },
    {
      id: 'd-5',
      title: 'Decentralized Grid Evaluation Project',
      contactId: 'c-5',
      contactName: 'Kristin Watson',
      company: 'BlueGrid Foundation',
      value: 15000,
      stage: 'Lead',
      probability: 15,
      expectedCloseDate: '2026-10-30'
    }
  ],
  interactions: [
    {
      id: 'i-1',
      contactId: 'c-2',
      contactName: 'Marcus Brody',
      type: 'Meeting',
      date: '2026-06-15',
      summary: 'Project handoff meeting',
      details: 'Reviewed the holographic server structure and signed off on the final master contract. Initial deployment begins next Monday.'
    },
    {
      id: 'i-2',
      contactId: 'c-4',
      contactName: 'Devon Lane',
      type: 'Call',
      date: '2026-06-14',
      summary: 'Scope verification call',
      details: 'Devon verified creative bounds. We will finalize the agency deliverables deck and present the initial pricing model on Thursday.'
    },
    {
      id: 'i-3',
      contactId: 'c-1',
      contactName: 'Olivia Vance',
      type: 'Proposal',
      date: '2026-06-12',
      summary: 'Shared updated SLA pricing',
      details: 'Emailed the enterprise multi-tenant licensing tiered layout outline. Olivia confirmed she is discussing with the legal team.'
    }
  ],
  tasks: [
    {
      id: 't-1',
      title: 'Revise Aurora Cloud C-level SLA proposal',
      dueDate: '2026-06-18',
      status: 'Pending',
      priority: 'High',
      assignedTo: 'Account Executive',
      contactId: 'c-1',
      contactName: 'Olivia Vance'
    },
    {
      id: 't-2',
      title: 'Deploy initial setup environment for Heliox',
      dueDate: '2026-06-20',
      status: 'Pending',
      priority: 'High',
      assignedTo: 'Technical Lead',
      contactId: 'c-2',
      contactName: 'Marcus Brody'
    },
    {
      id: 't-3',
      title: 'Follow up on Elena Rostova proposal reviews',
      dueDate: '2026-06-22',
      status: 'Pending',
      priority: 'Medium',
      assignedTo: 'Account Executive',
      contactId: 'c-3',
      contactName: 'Elena Rostova'
    },
    {
      id: 't-4',
      title: 'Deliver final design spec file',
      dueDate: '2026-06-14',
      status: 'Completed',
      priority: 'Medium',
      assignedTo: 'Design Team',
      contactId: 'c-4',
      contactName: 'Devon Lane'
    }
  ]
};

interface DashboardProps {
  userEmail: string;
  username: string;
  onLogout: () => void;
}

type TabType = 'overview' | 'contacts' | 'deals' | 'interactions' | 'tasks';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

export default function Dashboard({ userEmail, username, onLogout }: DashboardProps) {
  // 1. Core Reactive CRM States
  const [crmData, setCrmData] = useState<CRMData>(() => {
    const saved = localStorage.getItem('atomz_crm_database_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback to initial
      }
    }
    return INITIAL_CRM_DATA;
  });

  const [activeTab, setActiveTab] = useState<TabType>('overview');
  
  // 2. Global search and filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // 3. Selection Drawer States
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  // 4. Form Submission States for New Entry Modals / Forms
  const [isAddingContact, setIsAddingContact] = useState(false);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [isAddingDeal, setIsAddingDeal] = useState(false);

  // A. Contact Creation Form state
  const [newContactName, setNewContactName] = useState('');
  const [newContactEmail, setNewContactEmail] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');
  const [newContactCompany, setNewContactCompany] = useState('');
  const [newContactVal, setNewContactVal] = useState('25000');
  const [newContactTags, setNewContactTags] = useState('SaaS, Inbound');
  const [newContactStatus, setNewContactStatus] = useState<'Lead' | 'Contacted' | 'Proposal' | 'Negotiation' | 'Won' | 'Lost'>('Lead');

  // B. Task Creation form state
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDueDate, setNewTaskDueDate] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<'Low' | 'Medium' | 'High'>('Medium');
  const [newTaskAssigned, setNewTaskAssigned] = useState('Account Executive');
  const [newTaskContactId, setNewTaskContactId] = useState('');

  // C. Deal Creation form state
  const [newDealTitle, setNewDealTitle] = useState('');
  const [newDealVal, setNewDealVal] = useState('50000');
  const [newDealContactId, setNewDealContactId] = useState('');
  const [newDealStage, setNewDealStage] = useState<'Lead' | 'Contacted' | 'Proposal' | 'Negotiation' | 'Won' | 'Lost'>('Lead');

  // D. Quick Note logging state on single contact panel
  const [quickNoteType, setQuickNoteType] = useState<'Call' | 'Email' | 'Meeting' | 'Note' | 'Proposal'>('Call');
  const [quickNoteText, setQuickNoteText] = useState('');

  // Auto-backup to Local Storage on database adjustments
  useEffect(() => {
    localStorage.setItem('atomz_crm_database_v2', JSON.stringify(crmData));
  }, [crmData]);

  // RESET DATABASE helpers
  const handleResetDatabase = () => {
    if (window.confirm('Reset local storage back to standard simulation data?')) {
      setCrmData(INITIAL_CRM_DATA);
      setSelectedContact(null);
      setSearchQuery('');
    }
  };

  // CALCULATE KPI METRICS
  const calculateKPIs = () => {
    const totalContacts = crmData.contacts.length;
    
    // Total Revenue (Total deal value of all Won contacts)
    const wonContacts = crmData.contacts.filter(c => c.status === 'Won');
    const totalWonRevenue = wonContacts.reduce((sum, c) => sum + c.dealValue, 0);

    // Active pipeline (Deals currently not Won or Lost)
    const activeDeals = crmData.contacts.filter(c => c.status !== 'Won' && c.status !== 'Lost');
    const pipelineValue = activeDeals.reduce((sum, c) => sum + c.dealValue, 0);

    // Task completions
    const totalTasks = crmData.tasks.length;
    const completedTasks = crmData.tasks.filter(t => t.status === 'Completed').length;
    const taskRatio = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    return { totalContacts, totalWonRevenue, pipelineValue, taskRatio, totalTasks, completedTasks };
  };

  const kpi = calculateKPIs();

  // PIPELINE STAGES COUNT DATA
  const stageCounts = {
    Lead: crmData.contacts.filter(c => c.status === 'Lead').length,
    Contacted: crmData.contacts.filter(c => c.status === 'Contacted').length,
    Proposal: crmData.contacts.filter(c => c.status === 'Proposal').length,
    Negotiation: crmData.contacts.filter(c => c.status === 'Negotiation').length,
    Won: crmData.contacts.filter(c => c.status === 'Won').length,
    Lost: crmData.contacts.filter(c => c.status === 'Lost').length,
  };

  // PIPELINE VALUES FOR CHANNELS
  const stageValues = {
    Lead: crmData.contacts.filter(c => c.status === 'Lead').reduce((sum, c) => sum + c.dealValue, 0),
    Contacted: crmData.contacts.filter(c => c.status === 'Contacted').reduce((sum, c) => sum + c.dealValue, 0),
    Proposal: crmData.contacts.filter(c => c.status === 'Proposal').reduce((sum, c) => sum + c.dealValue, 0),
    Negotiation: crmData.contacts.filter(c => c.status === 'Negotiation').reduce((sum, c) => sum + c.dealValue, 0),
    Won: crmData.contacts.filter(c => c.status === 'Won').reduce((sum, c) => sum + c.dealValue, 0),
    Lost: crmData.contacts.filter(c => c.status === 'Lost').reduce((sum, c) => sum + c.dealValue, 0),
  };

  // ACTIONS: ADD CONTACT
  const handleCreateContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContactName.trim() || !newContactCompany.trim()) return;

    const emailStr = newContactEmail.trim() || `${newContactName.toLowerCase().replace(/\s+/g, '.')}@${newContactCompany.toLowerCase().replace(/\s+/g, '')}.com`;
    const tagArray = newContactTags.split(',').map(t => t.trim()).filter(Boolean);
    const valueNum = parseFloat(newContactVal) || 0;

    const avatarGradients = [
      'from-neutral-600 to-neutral-800',
      'from-neutral-700 to-neutral-900',
      'from-neutral-500 to-neutral-700',
      'from-neutral-800 to-neutral-950',
      'from-neutral-550 to-neutral-750',
      'from-neutral-400 to-neutral-600'
    ];
    const randomizedColor = avatarGradients[Math.floor(Math.random() * avatarGradients.length)];

    const newlyCreatedContact: Contact = {
      id: `c-${Date.now()}`,
      name: newContactName,
      email: emailStr,
      phone: newContactPhone || '+1 (555) 000-0000',
      company: newContactCompany,
      avatarColor: randomizedColor,
      status: newContactStatus,
      dealValue: valueNum,
      lastInteractionDate: new Date().toISOString().split('T')[0],
      tags: tagArray.length > 0 ? tagArray : ['SaaS']
    };

    // Also spin up a corresponding Deal card
    const newlyCreatedDeal: Deal = {
      id: `d-${Date.now()}`,
      title: `${newContactCompany} Hub Contract`,
      contactId: newlyCreatedContact.id,
      contactName: newlyCreatedContact.name,
      company: newlyCreatedContact.company,
      value: valueNum,
      stage: newlyCreatedContact.status,
      probability: getStageProbability(newlyCreatedContact.status),
      expectedCloseDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // today + 30 days
    };

    // Auto log initial interaction
    const newlyCreatedInteraction: Interaction = {
      id: `i-${Date.now()}`,
      contactId: newlyCreatedContact.id,
      contactName: newlyCreatedContact.name,
      type: 'Note',
      date: new Date().toISOString().split('T')[0],
      summary: 'Contact registered in CRM system',
      details: `Profile created with an estimated deal weight value of $${valueNum.toLocaleString()}`
    };

    setCrmData(prev => ({
      contacts: [newlyCreatedContact, ...prev.contacts],
      deals: [newlyCreatedDeal, ...prev.deals],
      interactions: [newlyCreatedInteraction, ...prev.interactions],
      tasks: prev.tasks
    }));

    // Reset fields
    setNewContactName('');
    setNewContactEmail('');
    setNewContactPhone('');
    setNewContactCompany('');
    setNewContactVal('25000');
    setNewContactTags('SaaS, Inbound');
    setNewContactStatus('Lead');
    setIsAddingContact(false);
  };

  // ACTIONS: ADD TASK
  const handleCreateTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    let linkedName = '';
    if (newTaskContactId) {
      linkedName = crmData.contacts.find(c => c.id === newTaskContactId)?.name || '';
    }

    const createdTask: Task = {
      id: `t-${Date.now()}`,
      title: newTaskTitle,
      dueDate: newTaskDueDate || new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'Pending',
      priority: newTaskPriority,
      assignedTo: newTaskAssigned,
      contactId: newTaskContactId || undefined,
      contactName: linkedName || undefined
    };

    setCrmData(prev => ({
      ...prev,
      tasks: [createdTask, ...prev.tasks]
    }));

    setNewTaskTitle('');
    setNewTaskDueDate('');
    setNewTaskPriority('Medium');
    setNewTaskContactId('');
    setIsAddingTask(false);
  };

  // ACTIONS: QUICK NOTE LOGGING ON SINGLE CONTACT
  const handleLogQuickNote = (e: React.FormEvent, cId: string) => {
    e.preventDefault();
    if (!quickNoteText.trim()) return;

    const contactObj = crmData.contacts.find(c => c.id === cId);
    if (!contactObj) return;

    const loggedInteraction: Interaction = {
      id: `i-${Date.now()}`,
      contactId: cId,
      contactName: contactObj.name,
      type: quickNoteType,
      date: new Date().toISOString().split('T')[0],
      summary: quickNoteText.trim().substring(0, 50) + (quickNoteText.length > 50 ? '...' : ''),
      details: quickNoteText.trim()
    };

    // Update contact interaction date and current list
    const updatedContacts = crmData.contacts.map(c => {
      if (c.id === cId) {
        return {
          ...c,
          lastInteractionDate: new Date().toISOString().split('T')[0]
        };
      }
      return c;
    });

    setCrmData(prev => ({
      ...prev,
      contacts: updatedContacts,
      interactions: [loggedInteraction, ...prev.interactions]
    }));

    setQuickNoteText('');
    
    // Also sync the detail drawer object so its interactions refresh list instantly
    const refreshedContact = updatedContacts.find(c => c.id === cId) || null;
    if (refreshedContact) {
      setSelectedContact(refreshedContact);
    }
  };

  // ACTIONS: TRASH CONTACT
  const handleDeleteContact = (contactId: string) => {
    if (window.confirm('Delete this contact and all corresponding deals & interaction logs?')) {
      setCrmData(prev => ({
        contacts: prev.contacts.filter(c => c.id !== contactId),
        deals: prev.deals.filter(d => d.contactId !== contactId),
        interactions: prev.interactions.filter(i => i.contactId !== contactId),
        tasks: prev.tasks.filter(t => t.contactId !== contactId)
      }));
      setSelectedContact(null);
    }
  };

  // ACTIONS: UPDATE DEAL STAGE / STATUS MOVEMENT
  const handleMoveDealStage = (dealId: string, newStage: 'Lead' | 'Contacted' | 'Proposal' | 'Negotiation' | 'Won' | 'Lost') => {
    const matchedDeal = crmData.deals.find(d => d.id === dealId);
    if (!matchedDeal) return;

    const updatedDeals = crmData.deals.map(d => {
      if (d.id === dealId) {
        return {
          ...d,
          stage: newStage,
          probability: getStageProbability(newStage)
        };
      }
      return d;
    });

    // Also update matching contact status!
    const updatedContacts = crmData.contacts.map(c => {
      if (c.id === matchedDeal.contactId) {
        return {
          ...c,
          status: newStage
        };
      }
      return c;
    });

    // Log this movement
    const movementLog: Interaction = {
      id: `i-${Date.now()}`,
      contactId: matchedDeal.contactId,
      contactName: matchedDeal.contactName,
      type: 'Note',
      date: new Date().toISOString().split('T')[0],
      summary: `Deal stage shifted to ${newStage}`,
      details: `Sales executive transitioned deal status of [${matchedDeal.title}] to stage: ${newStage}`
    };

    setCrmData(prev => ({
      contacts: updatedContacts,
      deals: updatedDeals,
      interactions: [movementLog, ...prev.interactions],
      tasks: prev.tasks
    }));

    if (selectedContact && selectedContact.id === matchedDeal.contactId) {
      setSelectedContact(prev => prev ? { ...prev, status: newStage } : null);
    }
  };

  // ACTIONS: TOGGLE TASK
  const handleToggleTaskStatus = (taskId: string) => {
    const updatedTasks = crmData.tasks.map(t => {
      if (t.id === taskId) {
        return {
          ...t,
          status: (t.status === 'Completed' ? 'Pending' : 'Completed') as 'Pending' | 'Completed'
        };
      }
      return t;
    });

    setCrmData(prev => ({
      ...prev,
      tasks: updatedTasks
    }));
  };

  // ACTIONS: TRASH TASK
  const handleDeleteTask = (taskId: string) => {
    setCrmData(prev => ({
      ...prev,
      tasks: prev.tasks.filter(t => t.id !== taskId)
    }));
  };

  const getStageProbability = (stage: string) => {
    switch (stage) {
      case 'Lead': return 15;
      case 'Contacted': return 30;
      case 'Proposal': return 50;
      case 'Negotiation': return 75;
      case 'Won': return 100;
      case 'Lost': return 0;
      default: return 50;
    }
  };

  // FILTERS FOR CONTACTS TABLE
  const filteredContacts = crmData.contacts.filter(contact => {
    const matchesSearch = 
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.phone.includes(searchQuery);

    const matchesStatus = statusFilter === 'All' || contact.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div id="crm-main-container" className="min-h-screen md:h-screen md:max-h-screen bg-charcoal-black text-camel-white flex flex-col md:flex-row relative overflow-hidden font-sans">
      
      {/* Mini cool glowing ambient flares */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-camel/[0.03] blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-camel/[0.02] blur-[120px] pointer-events-none z-0" />

      {/* 1. SIDEBAR NAVIGATION CONTROLS */}
      <aside id="crm-sidebar" className="w-full md:w-64 border-b md:border-b-0 md:border-r border-[#E2E8F0]/10 bg-charcoal-card flex flex-col justify-between py-6 px-4 shrink-0 z-10 md:sticky md:top-0 md:h-screen md:overflow-y-auto relative">
        <div className="space-y-6">
          
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
              <svg className="w-8 h-8 text-white shrink-0 pointer-events-none" viewBox="0 0 100 100" fill="currentColor">
                <rect x="38" y="14" width="24" height="6" rx="3" />
                <rect x="22" y="25" width="56" height="6" rx="3" />
                <rect x="9" y="36" width="82" height="6" rx="3" />
                <rect x="3" y="47" width="94" height="6" rx="3" />
                <rect x="9" y="58" width="82" height="6" rx="3" />
                <rect x="22" y="69" width="56" height="6" rx="3" />
                <rect x="38" y="80" width="24" height="6" rx="3" />
              </svg>
              <div>
                <span className="font-bold text-base tracking-tight text-white block leading-none">AXIOM</span>
                <span className="text-[9px] text-camel-muted font-mono tracking-wider block mt-1 uppercase">ENTERPRISE CLOUD</span>
              </div>
            </div>
          </div>

          <div id="sidebar-user-glance" className="p-3 bg-[#131316]/50 border border-charcoal-border rounded-xl flex items-center gap-2.5" title={userEmail}>
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-camel to-camel-hover text-charcoal-black font-bold text-xs flex items-center justify-center shadow-md">
              {(username || userEmail).substring(0, 2).toUpperCase()}
            </div>
            <div className="truncate flex-1">
              <span className="block text-xs font-bold text-camel-white truncate">
                {username || userEmail.split('@')[0]}
              </span>
              <span className="text-[10px] text-camel font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-camel animate-pulse inline-block" />
                Workspace Active
              </span>
            </div>
          </div>

          {/* Nav Items */}
          <nav id="crm-nav-list" className="space-y-1.5 relative">
            <motion.button
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => { setActiveTab('overview'); setSelectedContact(null); }}
              className={`relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold cursor-pointer z-10 transition-colors ${
                activeTab === 'overview'
                  ? 'bg-gradient-to-b from-camel to-camel-hover text-charcoal-black shadow-[0_6px_20px_rgba(197,168,128,0.3),_inset_0_1.5px_1px_rgba(255,255,255,0.4),_0_1px_2px_rgba(0,0,0,0.5)] border-t border-white/25 border-b border-black/45 font-bold'
                  : 'text-camel-muted hover:text-camel-white'
               }`}
            >
              {activeTab === 'overview' && (
                <motion.div
                  layoutId="activeTabUnderlay"
                  className="absolute inset-0 bg-gradient-to-r from-camel/5 to-transparent border-l-2 border-camel rounded-xl -z-10"
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                />
              )}
              <Activity className="w-4 h-4" />
              <span>Sales Dashboard</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => { setActiveTab('contacts'); }}
              className={`relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold cursor-pointer z-10 transition-colors ${
                activeTab === 'contacts'
                  ? 'bg-gradient-to-b from-camel to-camel-hover text-charcoal-black shadow-[0_6px_20px_rgba(197,168,128,0.3),_inset_0_1.5px_1px_rgba(255,255,255,0.4),_0_1px_2px_rgba(0,0,0,0.5)] border-t border-white/25 border-b border-black/45 font-bold'
                  : 'text-camel-muted hover:text-camel-white'
               }`}
            >
              {activeTab === 'contacts' && (
                <motion.div
                  layoutId="activeTabUnderlay"
                  className="absolute inset-0 bg-gradient-to-r from-camel/5 to-transparent border-l-2 border-camel rounded-xl -z-10"
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                />
              )}
              <Users className="w-4 h-4" />
              <span>Contacts Directory</span>
              <span className={`ml-auto px-1.5 py-0.2 rounded-full text-[9px] transition-colors ${
                activeTab === 'contacts' ? 'bg-[#000000]/40 text-camel' : 'bg-charcoal-black text-[#E2E8F0]'
              }`}>
                {crmData.contacts.length}
              </span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => { setActiveTab('deals'); setSelectedContact(null); }}
              className={`relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold cursor-pointer z-10 transition-colors ${
                activeTab === 'deals'
                  ? 'bg-gradient-to-b from-camel to-camel-hover text-charcoal-black shadow-[0_6px_20px_rgba(197,168,128,0.3),_inset_0_1.5px_1px_rgba(255,255,255,0.4),_0_1px_2px_rgba(0,0,0,0.5)] border-t border-white/25 border-b border-black/45 font-bold'
                  : 'text-camel-muted hover:text-camel-white'
               }`}
            >
              {activeTab === 'deals' && (
                <motion.div
                  layoutId="activeTabUnderlay"
                  className="absolute inset-0 bg-gradient-to-r from-camel/5 to-transparent border-l-2 border-camel rounded-xl -z-10"
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                />
              )}
              <Briefcase className="w-4 h-4" />
              <span>Deals Pipeline</span>
              <span className={`ml-auto border px-1.5 py-0.2 rounded-full text-[9px] transition-colors ${
                activeTab === 'deals' ? 'bg-charcoal-black/20 border-charcoal-black/30 text-charcoal-black' : 'bg-camel/20 border-camel/30 text-camel'
              }`}>
                Kanban
              </span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => { setActiveTab('interactions'); setSelectedContact(null); }}
              className={`relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold cursor-pointer z-10 transition-colors ${
                activeTab === 'interactions'
                  ? 'bg-gradient-to-b from-camel to-camel-hover text-charcoal-black shadow-[0_6px_20px_rgba(197,168,128,0.3),_inset_0_1.5px_1px_rgba(255,255,255,0.4),_0_1px_2px_rgba(0,0,0,0.5)] border-t border-white/25 border-b border-black/45 font-bold'
                  : 'text-camel-muted hover:text-camel-white'
               }`}
            >
              {activeTab === 'interactions' && (
                <motion.div
                  layoutId="activeTabUnderlay"
                  className="absolute inset-0 bg-gradient-to-r from-camel/5 to-transparent border-l-2 border-camel rounded-xl -z-10"
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                />
              )}
              <FileText className="w-4 h-4" />
              <span>Interactions Logs</span>
              <span className={`ml-auto px-1.5 py-0.2 rounded-full text-[9px] transition-colors ${
                activeTab === 'interactions' ? 'bg-[#000000]/40 text-camel' : 'bg-charcoal-black text-[#E2E8F0]'
              }`}>
                {crmData.interactions.length}
              </span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => { setActiveTab('tasks'); setSelectedContact(null); }}
              className={`relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold cursor-pointer z-10 transition-colors ${
                activeTab === 'tasks'
                  ? 'bg-gradient-to-b from-camel to-camel-hover text-charcoal-black shadow-[0_6px_20px_rgba(197,168,128,0.3),_inset_0_1.5px_1px_rgba(255,255,255,0.4),_0_1px_2px_rgba(0,0,0,0.5)] border-t border-white/25 border-b border-black/45 font-bold'
                  : 'text-camel-muted hover:text-camel-white'
               }`}
            >
              {activeTab === 'tasks' && (
                <motion.div
                  layoutId="activeTabUnderlay"
                  className="absolute inset-0 bg-gradient-to-r from-camel/5 to-transparent border-l-2 border-camel rounded-xl -z-10"
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                />
              )}
              <CheckSquare className="w-4 h-4" />
              <span>Tasks & Followups</span>
              <span className={`ml-auto px-1.5 py-0.3 rounded-full text-[9px] transition-colors ${
                activeTab === 'tasks' ? 'bg-[#000000]/40 text-camel' : 'bg-slate-800 text-[#E2E8F0]'
              }`}>
                {crmData.tasks.filter(t => t.status === 'Pending').length}
              </span>
            </motion.button>
          </nav>
        </div>

        {/* Sidebar Footers */}
        <div className="space-y-3 mt-6 pt-6 border-t border-slate-800">
          <button
            onClick={handleResetDatabase}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-500 hover:text-slate-300 hover:bg-white/5 cursor-pointer transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Database Mock</span>
          </button>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold text-red-400/80 hover:text-red-300 hover:bg-red-950/30 border border-red-950/30 hover:border-red-900/40 cursor-pointer transition-all duration-300"
          >
            <LogOut className="w-4 h-4 text-red-400/70" />
            <span>Terminate Session</span>
          </button>
        </div>
      </aside>

      {/* 2. MAIN WORKING STAGE */}
      <main id="crm-main-stage" className="flex-1 min-h-0 overflow-y-auto p-4 md:p-8 z-10 relative">
        <AnimatePresence mode="wait">
          
          {/* ==================== A: SALES DASHBOARD VIEW ==================== */}
          {activeTab === 'overview' && (
            <motion.div
              key="tab-overview"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              {/* Heading */}
              <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-camel-white font-sans">Sales Operations Room</h2>
                  <p className="text-xs text-camel-muted mt-1">Real-time telemetry and conversion data across clients</p>
                </div>
                {/* Simulated Auto refresh widget */}
                <div className="text-[11px] font-mono font-medium px-3 py-1.5 rounded-xl border border-charcoal-border bg-charcoal-card text-camel-muted flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-camel animate-ping inline-block" />
                  <span>UTC Engine Synced</span>
                </div>
              </motion.div>

              {/* KPI Widgets */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 [perspective:1000px]">
                {/* KPI 1 */}
                <motion.div
                  variants={itemVariants}
                  whileHover={{ 
                    y: -6, 
                    scale: 1.02,
                    rotateX: 3,
                    rotateY: -2,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 20px rgba(255, 255, 255, 0.03)"
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="p-5 bg-gradient-to-br from-[#0E0E12] to-[#070709] border border-charcoal-border hover:border-white/15 rounded-2xl flex items-center justify-between shadow-xl transition-colors duration-300 relative overflow-hidden group cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
                  <div className="space-y-1 z-10">
                    <span className="text-camel-muted text-xs font-semibold tracking-wide">Total Revenue Closed</span>
                    <h3 className="text-2xl font-black text-camel-white tracking-tight">${kpi.totalWonRevenue.toLocaleString()}</h3>
                    <p className="text-[10px] text-white/80 flex items-center gap-1 font-medium">
                      <TrendingUp className="w-3" />
                      <span>+14.8% vs last month</span>
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white z-10 shadow-[0_4px_12px_rgba(255,255,255,0.05)] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                    <DollarSign className="w-5" />
                  </div>
                </motion.div>

                {/* KPI 2 */}
                <motion.div
                  variants={itemVariants}
                  whileHover={{ 
                    y: -6, 
                    scale: 1.02,
                    rotateX: 3,
                    rotateY: -2,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 20px rgba(255, 255, 255, 0.03)"
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="p-5 bg-gradient-to-br from-[#0E0E12] to-[#070709] border border-charcoal-border hover:border-white/15 rounded-2xl flex items-center justify-between shadow-xl transition-colors duration-300 relative overflow-hidden group cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
                  <div className="space-y-1 z-10">
                    <span className="text-camel-muted text-xs font-semibold tracking-wide">Pipeline Potential</span>
                    <h3 className="text-2xl font-black text-camel-white tracking-tight">${kpi.pipelineValue.toLocaleString()}</h3>
                    <p className="text-[10px] text-camel/80 font-medium">Negotiations active</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-camel/10 border border-camel/20 flex items-center justify-center text-camel z-10 shadow-[0_4px_12px_rgba(255,255,255,0.05)] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                    <Briefcase className="w-5" />
                  </div>
                </motion.div>

                {/* KPI 3 */}
                <motion.div
                  variants={itemVariants}
                  whileHover={{ 
                    y: -6, 
                    scale: 1.02,
                    rotateX: 3,
                    rotateY: -2,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 20px rgba(255, 255, 255, 0.03)"
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="p-5 bg-gradient-to-br from-[#0E0E12] to-[#070709] border border-charcoal-border hover:border-white/15 rounded-2xl flex items-center justify-between shadow-xl transition-colors duration-300 relative overflow-hidden group cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
                  <div className="space-y-1 z-10">
                    <span className="text-camel-muted text-xs font-semibold tracking-wide">Accounts Managed</span>
                    <h3 className="text-2xl font-black text-camel-white tracking-tight">{kpi.totalContacts}</h3>
                    <p className="text-[10px] text-camel/80 font-medium">Active portfolios</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-camel/10 border border-camel/20 flex items-center justify-center text-camel z-10 shadow-[0_4px_12px_rgba(255,255,255,0.05)] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                    <Users className="w-5" />
                  </div>
                </motion.div>

                {/* KPI 4 */}
                <motion.div
                  variants={itemVariants}
                  whileHover={{ 
                    y: -6, 
                    scale: 1.02,
                    rotateX: 3,
                    rotateY: -2,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 20px rgba(255, 255, 255, 0.03)"
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="p-5 bg-gradient-to-br from-[#0E0E12] to-[#070709] border border-charcoal-border hover:border-white/15 rounded-2xl flex items-center justify-between shadow-xl transition-colors duration-300 relative overflow-hidden group cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
                  <div className="space-y-1 z-10">
                    <span className="text-camel-muted text-xs font-semibold tracking-wide">Task Velocity Ratio</span>
                    <h3 className="text-2xl font-black text-camel-white tracking-tight">{kpi.taskRatio}%</h3>
                    <p className="text-[10px] text-camel-muted font-medium">{kpi.completedTasks} / {kpi.totalTasks} logs closed</p>
                  </div>
                  {/* Visual Circle Progress inside sidebar panel */}
                  <div className="relative w-11 h-11 shrink-0 flex items-center justify-center z-10 transition-transform duration-300 group-hover:scale-110">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="22" cy="22" r="18" fill="transparent" stroke="rgba(255,255,255,0.02)" strokeWidth="4" />
                      <circle cx="22" cy="22" r="18" fill="transparent" stroke="#C5A880" strokeWidth="4" strokeDasharray={`${2 * Math.PI * 18}`} strokeDashoffset={`${2 * Math.PI * 18 * (1 - kpi.taskRatio / 100)}`} strokeLinecap="round" />
                    </svg>
                    <span className="absolute text-[10px] font-bold text-camel-white">{kpi.taskRatio}%</span>
                  </div>
                </motion.div>
              </div>

              {/* conversion metrics widget and pipeline structure */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 [perspective:1000px]">
                
                {/* Sales Funnel Pipeline Stage chart (Beautiful customized SVG representation) */}
                <motion.div
                  variants={itemVariants}
                  whileHover={{ 
                    y: -4, 
                    scale: 1.005,
                    boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.85), 0 0 25px rgba(255, 255, 255, 0.01)" 
                  }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  className="lg:col-span-2 p-6 bg-gradient-to-br from-[#0E0E12] to-[#070709] border border-charcoal-border hover:border-white/10 rounded-2xl space-y-6 shadow-2xl transition-all duration-300 relative overflow-hidden group"
                >
                  <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="flex justify-between items-center relative z-10">
                    <div>
                      <h4 className="font-bold text-sm text-camel-white">Sales Pipeline Distribution Weighted</h4>
                      <p className="text-[11px] text-camel-muted">Aggregate capital volume queued by stage</p>
                    </div>
                    <span className="text-[11px] px-2.5 py-1 bg-charcoal-black border border-charcoal-border rounded-lg text-camel-white font-mono tracking-tight shadow-inner">
                      Sum: ${(kpi.pipelineValue + kpi.totalWonRevenue).toLocaleString()}
                    </span>
                  </div>
 
                  {/* CUSTOM SVG STAGES GRAPH WITH PIPELINE LABELS */}
                  <div className="space-y-4 pt-2 relative z-10">
                    {(['Lead', 'Contacted', 'Proposal', 'Negotiation', 'Won', 'Lost'] as const).map(stage => {
                      const count = stageCounts[stage];
                      const val = stageValues[stage];
                      const maxVal = Math.max(...Object.values(stageValues), 1);
                      const percentage = Math.max((val / maxVal) * 100, 3); // minimum visual width
                      
                      const stageColors: Record<string, string> = {
                        Lead: 'bg-neutral-600',
                        Contacted: 'bg-neutral-500',
                        Proposal: 'bg-neutral-400',
                        Negotiation: 'bg-neutral-300',
                        Won: 'bg-white',
                        Lost: 'bg-neutral-700'
                      };
 
                      return (
                        <div key={stage} className="space-y-1.5 group/row cursor-pointer p-1.5 rounded-xl transition-all duration-200 hover:bg-white/[0.02]">
                          <div className="flex justify-between text-xs font-semibold">
                            <span className="flex items-center gap-2 text-camel-muted group-hover/row:text-camel-white transition-colors duration-200">
                              <span className={`w-2 h-2 rounded-full ${stageColors[stage]} transition-transform duration-200 group-hover/row:scale-125`} />
                              {stage} ({count} {count === 1 ? 'contact' : 'contacts'})
                            </span>
                            <span className="text-camel-white font-mono group-hover/row:scale-105 transition-transform duration-200">${val.toLocaleString()}</span>
                          </div>
                          <div className="w-full h-3 bg-charcoal-border rounded-full overflow-hidden flex shadow-inner border border-white/[0.02]">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${percentage}%` }}
                              transition={{ duration: 0.8, ease: 'easeOut' }}
                              className={`h-full rounded-full ${stageColors[stage]} opacity-80 group-hover/row:opacity-100 transition-all duration-300 shadow-[0_0_12px_rgba(255,255,255,0.1)]`}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
 
                {/* QUICK TASK RADAR ON OVERVIEW */}
                <motion.div
                  variants={itemVariants}
                  whileHover={{ 
                    y: -4, 
                    scale: 1.005,
                    boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.85), 0 0 25px rgba(255, 255, 255, 0.01)" 
                  }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  id="overview-task-panel"
                  className="p-6 bg-gradient-to-br from-[#0E0E12] to-[#070709] border border-charcoal-border hover:border-white/10 rounded-2xl space-y-4 shadow-xl flex flex-col justify-between transition-all duration-300 relative overflow-hidden group"
                >
                  <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <h4 className="font-bold text-sm text-camel-white font-sans">Actionable Agenda</h4>
                    <p className="text-[11px] text-camel-muted">Urgent logs pending attention</p>
                  </div>
 
                  <div className="space-y-3 flex-1 overflow-y-auto max-h-[220px] mt-4 pr-1 relative z-10">
                    {crmData.tasks.filter(t => t.status === 'Pending').slice(0, 4).length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500 space-y-2">
                        <CheckCircle className="w-8 h-8 text-neutral-500/60" />
                        <span className="text-xs">Agenda fully cleared!</span>
                      </div>
                    ) : (
                      crmData.tasks.filter(t => t.status === 'Pending').slice(0, 4).map(task => (
                        <div 
                           key={task.id} 
                           className="p-3 bg-[#0d0d10] border border-charcoal-border hover:border-white/20 hover:bg-[#131318] rounded-xl flex items-start gap-2.5 transition-all duration-300 hover:scale-[1.02] shadow-[0_2px_8px_rgba(0,0,0,0.3)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.5)] cursor-pointer group/item"
                        >
                          <button
                            onClick={() => handleToggleTaskStatus(task.id)}
                            className="mt-0.5 w-4 h-4 rounded border border-charcoal-border flex items-center justify-center text-camel hover:border-camel transition-colors cursor-pointer shrink-0"
                          >
                            <span className="opacity-0 hover:opacity-100 font-bold text-[9px] text-camel">✔</span>
                          </button>
                          <div className="min-w-0 flex-1 space-y-0.5">
                            <span className="block text-xs font-semibold text-camel-white truncate leading-snug group-hover/item:text-white transition-colors">{task.title}</span>
                            <div className="flex items-center gap-2 text-[10px] text-camel-muted">
                              <span className="font-mono text-camel-muted/60">{task.dueDate}</span>
                              <span className={`text-[8px] tracking-wider px-1.5 py-0.5 rounded font-mono uppercase font-bold transition-all ${
                                task.priority === 'High' ? 'bg-white/10 text-white shadow-sm' :
                                task.priority === 'Medium' ? 'bg-neutral-800 text-neutral-300' :
                                'bg-neutral-950 text-neutral-500 border border-neutral-800'
                              }`}>
                                {task.priority}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
 
                  <button
                    onClick={() => setActiveTab('tasks')}
                    className="w-full text-center text-xs py-2 bg-charcoal-black border border-charcoal-border hover:border-white/20 hover:bg-[#121217] rounded-xl text-camel font-semibold cursor-pointer transition-all duration-300 relative z-10 shadow-sm"
                  >
                    Manage Tasks
                  </button>
                </motion.div>
 
              </div>
 
              {/* RECENT HIGHLIGHTED UPDATES SECTION */}
              <motion.div
                variants={itemVariants}
                whileHover={{ 
                  y: -4, 
                  scale: 1.002,
                  boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.85), 0 0 25px rgba(255, 255, 255, 0.01)" 
                }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className="p-6 bg-gradient-to-br from-[#0E0E12] to-[#070709] border border-charcoal-border hover:border-white/10 rounded-2xl space-y-4 shadow-[0_15px_40px_rgba(0,0,0,0.5)] transition-all duration-300 relative overflow-hidden group"
              >
                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="flex justify-between items-center relative z-10">
                  <div>
                    <h4 className="font-bold text-sm text-camel-white">Operations Journal Feed</h4>
                    <p className="text-[11px] text-camel-muted font-sans font-medium">Recent logged calls, emails, and meetings</p>
                  </div>
                  <button 
                    onClick={() => setActiveTab('interactions')}
                    className="text-xs text-camel hover:text-white font-semibold cursor-pointer transition-colors"
                  >
                    View All Interactions
                  </button>
                </div>
 
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
                  {crmData.interactions.slice(0, 3).map(interaction => {
                    const iconColor = {
                      Call: 'bg-neutral-800/20 border border-neutral-800/30 text-neutral-400',
                      Email: 'bg-neutral-700/20 border border-neutral-700/30 text-neutral-300',
                      Meeting: 'bg-white/10 border border-white/20 text-white',
                      Note: 'bg-neutral-900 border border-neutral-800 text-neutral-500',
                      Proposal: 'bg-neutral-600/20 border border-neutral-600/30 text-neutral-200',
                    }[interaction.type];
 
                    const iconElement = {
                      Call: <Phone className="w-3.5 h-3.5" />,
                      Email: <Mail className="w-3.5 h-3.5" />,
                      Meeting: <Users className="w-3.5 h-3.5" />,
                      Note: <FileText className="w-3.5 h-3.5" />,
                      Proposal: <TrendingUp className="w-3.5 h-3.5" />,
                    }[interaction.type];
 
                    return (
                      <div 
                         key={interaction.id}
                         className="p-4 bg-[#0d0d10] border border-charcoal-border hover:border-white/15 rounded-xl flex flex-col justify-between space-y-3 transition-all duration-300 hover:scale-[1.02] hover:bg-[#131318] hover:shadow-[0_10px_20px_rgba(0,0,0,0.5)] cursor-pointer group/journal"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className={`p-2 rounded-lg border flex items-center justify-center transition-all duration-300 group-hover/journal:scale-110 ${iconColor}`}>
                            {iconElement}
                          </div>
                          <span className="text-[10px] font-mono text-camel-muted/60">{interaction.date}</span>
                        </div>
                        <div>
                          <strong className="block text-xs font-semibold text-camel-white truncate group-hover/journal:text-white transition-colors">{interaction.summary}</strong>
                          <span className="text-[10px] text-camel mt-0.5 block font-medium">Client: {interaction.contactName}</span>
                        </div>
                        <p className="text-[11px] text-camel-muted line-clamp-2 leading-relaxed bg-charcoal-black p-2 rounded-lg border border-charcoal-border/30 group-hover/journal:border-white/[0.05] transition-all">
                          {interaction.details}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

            </motion.div>
          )}


          {/* ==================== B: CONTACTS DIRECTORY VIEW ==================== */}
          {activeTab === 'contacts' && (
            <motion.div
              key="tab-contacts"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-camel-white">Client Portfolio</h2>
                  <p className="text-xs text-camel-muted mt-1">Directory of contacts, lead records, and client notes</p>
                </div>
                {/* Trigger Add modal */}
                <button
                  type="button"
                  id="btn-add-contact-trigger"
                  onClick={() => setIsAddingContact(true)}
                  className="px-4 py-2 bg-gradient-to-r from-camel to-camel-hover hover:from-camel-hover hover:to-camel rounded-xl text-xs font-bold text-charcoal-black shadow-xl transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4 text-charcoal-black" />
                  <span>Onboard New Client</span>
                </button>
              </motion.div>

              {/* FILTERS & SEARCH HERO BAR */}
              <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-charcoal-card border border-charcoal-border rounded-2xl shadow-sm">
                {/* Search */}
                <div className="md:col-span-2 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-camel-muted" />
                  <input
                    type="text"
                    placeholder="Search by client name, email, or company..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-charcoal-black border border-charcoal-border text-xs text-camel-white placeholder-camel-muted/55 outline-none focus:border-camel/60 transition-all font-medium"
                  />
                </div>

                {/* Filter Selector */}
                <div>
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-camel-muted" />
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-charcoal-black border border-charcoal-border text-xs text-camel-white outline-none focus:border-camel/60 transition-all cursor-pointer font-medium appearance-none"
                    >
                      <option value="All">All Pipelines</option>
                      <option value="Lead">Lead stage</option>
                      <option value="Contacted">Contacted stage</option>
                      <option value="Proposal">Proposal stage</option>
                      <option value="Negotiation">Negotiation stage</option>
                      <option value="Won">Won stage</option>
                      <option value="Lost">Lost stage</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-2 justify-end">
                  {statusFilter !== 'All' || searchQuery !== '' ? (
                    <button
                      onClick={() => { setSearchQuery(''); setStatusFilter('All'); }}
                      className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-semibold cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Clear filter</span>
                    </button>
                  ) : (
                    <div className="text-[11px] text-slate-500 flex items-center font-mono pr-2">
                      Viewing {filteredContacts.length} of {crmData.contacts.length} records
                    </div>
                  )}
                </div>
              </motion.div>

              {/* TWO PANEL DIRECTORY AND SIDE EXPANSION DETAILS */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
                
                {/* Contact grid/table */}
                <motion.div variants={itemVariants} className="xl:col-span-2 overflow-x-auto bg-charcoal-card border border-charcoal-border rounded-2xl shadow-xl">
                  {filteredContacts.length === 0 ? (
                    <div className="p-12 text-center space-y-4">
                      <AlertCircle className="w-8 h-8 text-camel-muted mx-auto" />
                      <div>
                        <span className="block text-sm font-bold text-camel-white">No matches found</span>
                        <p className="text-xs text-camel-muted mt-1">Refine your lookups or register a clean account to begin</p>
                      </div>
                    </div>
                  ) : (
                    <table className="w-full text-left border-collapse min-w-[600px]">
                      <thead>
                        <tr className="border-b border-charcoal-border text-[11px] uppercase tracking-wider text-camel-muted font-bold bg-charcoal-black/30">
                          <th className="py-4 px-4">Contact</th>
                          <th className="py-4 px-4">Company</th>
                          <th className="py-4 px-4">Sales Cycle Stage</th>
                          <th className="py-4 px-4 text-right">Estimated Deal Weight</th>
                          <th className="py-4 px-4 text-center">Diagnostics</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-charcoal-border/50">
                        {filteredContacts.map(contact => {
                          const isSelected = selectedContact?.id === contact.id;
                          
                          const colors: Record<string, string> = {
                            Lead: 'text-neutral-400 bg-neutral-400/10 border-neutral-400/20',
                            Contacted: 'text-neutral-300 bg-neutral-300/10 border-neutral-300/20',
                            Proposal: 'text-camel-white bg-white/10 border-white/20',
                            Negotiation: 'text-neutral-200 bg-neutral-200/10 border-neutral-200/20',
                            Won: 'text-white bg-white/15 border-white/25 font-bold',
                            Lost: 'text-neutral-500 bg-neutral-500/10 border-neutral-500/20',
                          };

                          return (
                            <tr 
                              key={contact.id}
                              onClick={() => setSelectedContact(contact)}
                              className={`group cursor-pointer hover:bg-camel/[0.03] transition-all ${
                                isSelected ? 'bg-camel/[0.06] border-l-2 border-camel' : ''
                              }`}
                            >
                              {/* Contact avatar & names */}
                              <td className="py-4 px-4 flex items-center gap-3">
                                <div className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${contact.avatarColor} text-white font-extrabold text-xs flex items-center justify-center shrink-0 shadow-md`}>
                                  {contact.name.split(' ').map(n=>n[0]).join('')}
                                </div>
                                <div className="min-w-0">
                                  <span className="block text-xs font-bold text-camel-white group-hover:text-camel transition-colors">{contact.name}</span>
                                  <span className="block text-[10px] text-camel-muted/60 truncate mt-0.5">{contact.email}</span>
                                </div>
                              </td>

                              {/* Company */}
                              <td className="py-4 px-4">
                                <span className="block text-xs font-semibold text-slate-300 leading-snug">{contact.company}</span>
                                <span className="block text-[10px] text-slate-500 text-slate-500 font-serif">{contact.phone}</span>
                              </td>

                              {/* Stage Badge */}
                              <td className="py-4 px-4">
                                <span className={`inline-block text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 border rounded-lg ${colors[contact.status]}`}>
                                  {contact.status}
                                </span>
                              </td>

                              {/* Dollar Value */}
                              <td className="py-4 px-4 text-right">
                                <span className="block text-xs font-mono font-bold text-white">${contact.dealValue.toLocaleString()}</span>
                              </td>

                              {/* Action tools */}
                              <td className="py-4 px-4 text-center">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteContact(contact.id);
                                  }}
                                  className="p-1.5 rounded-lg border border-white/5 hover:border-white/20 hover:bg-white/10 text-neutral-500 hover:text-white transition-all cursor-pointer"
                                  title="Delete Account Portfolio"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  )}
                </motion.div>

                {/* INDIVIDUAL PORTFOLIO DETAIL SIDEBAR DRAWER */}
                <motion.div variants={itemVariants} className="p-6 bg-charcoal-card border border-charcoal-border rounded-2xl min-h-[500px] shadow-2xl flex flex-col justify-between">
                  {selectedContact ? (
                    <div className="space-y-6">
                      
                      {/* Header brief */}
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${selectedContact.avatarColor} text-white font-extrabold text-sm flex items-center justify-center shadow-lg`}>
                            {selectedContact.name.split(' ').map(n=>n[0]).join('')}
                          </div>
                          <div>
                            <h3 className="font-extrabold text-camel-white text-base">{selectedContact.name}</h3>
                            <span className="text-xs text-camel-muted font-bold">{selectedContact.company}</span>
                          </div>
                        </div>

                        {/* Dropdown status update */}
                        <select
                          value={selectedContact.status}
                          onChange={(e) => {
                            // Find corresponding deal card
                            const matchingDeal = crmData.deals.find(d => d.contactId === selectedContact.id);
                            if (matchingDeal) {
                              handleMoveDealStage(matchingDeal.id, e.target.value as any);
                            } else {
                              // If no specific deal card exists, just create or adjust contact status directly
                              const updated = crmData.contacts.map(c => c.id === selectedContact.id ? { ...c, status: e.target.value as any } : c);
                              setCrmData(p => ({ ...p, contacts: updated }));
                              setSelectedContact(prev => prev ? { ...prev, status: e.target.value as any } : null);
                            }
                          }}
                          className="px-2 py-1 bg-charcoal-black border border-charcoal-border text-[10px] text-camel font-bold rounded-lg cursor-pointer outline-none uppercase"
                        >
                          <option value="Lead">Lead</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Proposal">Proposal</option>
                          <option value="Negotiation">Negotiation</option>
                          <option value="Won">Won</option>
                          <option value="Lost">Lost</option>
                        </select>
                      </div>

                      {/* Contact metadata info list */}
                      <div className="p-4 bg-charcoal-black border border-charcoal-border rounded-xl space-y-3 text-xs">
                        <div className="flex items-center gap-2 text-camel-muted">
                          <Mail className="w-4 h-4 text-camel-muted/60 shrink-0" />
                          <span className="truncate leading-none">{selectedContact.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-camel-muted">
                          <Phone className="w-4 h-4 text-camel-muted/60 shrink-0" />
                          <span className="font-mono leading-none">{selectedContact.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-camel-muted">
                          <Tag className="w-4 h-4 text-camel-muted/60 shrink-0" />
                          <div className="flex flex-wrap gap-1">
                            {selectedContact.tags.map(tag => (
                              <span key={tag} className="text-[9px] px-1.5 py-0.2 rounded bg-camel/10 border border-camel/20 text-camel font-mono">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex justify-between pt-2 border-t border-charcoal-border/50">
                          <span className="text-camel-muted font-semibold">Deal Weight:</span>
                          <span className="text-camel font-mono font-extrabold">${selectedContact.dealValue.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-camel-muted font-semibold">Last Action:</span>
                          <span className="text-camel-white text-[10px] font-mono">{selectedContact.lastInteractionDate}</span>
                        </div>
                      </div>

                      {/* Record interaction notes in-drawer */}
                      <form onSubmit={(e) => handleLogQuickNote(e, selectedContact.id)} className="space-y-3 pb-3 border-b border-charcoal-border/50">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-camel-white uppercase tracking-wider font-mono">Log Interaction</span>
                          
                          {/* Note type icons selector */}
                          <div className="flex gap-1.5">
                            {(['Call', 'Email', 'Meeting', 'Note'] as const).map(type => (
                              <button
                                key={type}
                                type="button"
                                onClick={() => setQuickNoteType(type)}
                                className={`p-1.5 rounded transition-all cursor-pointer ${
                                  quickNoteType === type 
                                    ? 'bg-camel border-camel/30 text-charcoal-black font-extrabold' 
                                    : 'bg-charcoal-black border border-charcoal-border text-camel-muted hover:text-camel-white'
                                }`}
                                title={`Log a ${type}`}
                              >
                                {type === 'Call' && <Phone className="w-3 h-3" />}
                                {type === 'Email' && <Mail className="w-3 h-3" />}
                                {type === 'Meeting' && <Users className="w-3 h-3" />}
                                {type === 'Note' && <FileText className="w-3 h-3" />}
                              </button>
                            ))}
                          </div>
                        </div>

                        <textarea
                          rows={2}
                          value={quickNoteText}
                          onChange={(e) => setQuickNoteText(e.target.value)}
                          placeholder={`Type details for this ${quickNoteType.toLowerCase()} communication...`}
                          className="w-full p-3 rounded-xl bg-charcoal-black border border-charcoal-border hover:border-camel/40 focus:border-camel outline-none text-camel-white placeholder-camel-muted/40 text-xs transition-colors shadow-inner"
                          required
                        />

                        <button
                          type="submit"
                          className="w-full py-2 bg-camel hover:bg-camel-hover rounded-lg text-xs font-bold text-charcoal-black transition-all cursor-pointer"
                        >
                          Append Log Note
                        </button>
                      </form>

                      {/* Display recent history for this contact */}
                      <div className="space-y-3">
                        <span className="text-xs font-bold text-camel-white uppercase tracking-wider font-mono block">Timeline History</span>
                        <div className="space-y-2.5 max-h-[160px] overflow-y-auto pr-1">
                          {crmData.interactions.filter(i => i.contactId === selectedContact.id).length === 0 ? (
                            <span className="text-camel-muted/60 text-[10px] block text-center py-2">No custom activity logged yet</span>
                          ) : (
                            crmData.interactions
                              .filter(i => i.contactId === selectedContact.id)
                              .map(hist => (
                                <div key={hist.id} className="p-2.5 bg-charcoal-black border border-charcoal-border text-[10px]">
                                  <div className="flex justify-between items-start gap-2">
                                    <span className="font-bold text-camel uppercase text-[9px]">{hist.type}</span>
                                    <span className="text-[9px] text-camel-muted/50 font-mono">{hist.date}</span>
                                  </div>
                                  <p className="text-camel-white font-semibold mt-1 truncate">{hist.summary}</p>
                                  {hist.details && (
                                    <p className="text-[10px] text-camel-muted/70 mt-1 line-clamp-2 italic leading-relaxed">{hist.details}</p>
                                  )}
                                </div>
                              ))
                          )}
                        </div>
                      </div>

                    </div>
                  ) : (
                    <div className="my-auto text-center py-12 space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/[0.05] mx-auto flex items-center justify-center text-slate-400 shadow-md">
                        <Info className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="block text-xs font-bold text-white">No Portfolio Focus Selected</span>
                        <p className="text-[11px] text-slate-500 mt-1">Select any client row in the file manifest table to open active interaction terminals and diagnostics.</p>
                      </div>
                    </div>
                  )}
                </motion.div>

              </div>
            </motion.div>
          )}


          {/* ==================== C: KANBAN SALES PIPELINE BOARD ==================== */}
          {activeTab === 'deals' && (
            <motion.div
              key="tab-deals"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-camel-white">Visual Sales Pipelines</h2>
                  <p className="text-xs text-camel-muted mt-1">Holographic Kanban interface indicating deal velocities</p>
                </div>

                <div className="flex items-center gap-3">
                  {/* Summary aggregate info label */}
                  <div className="px-3 py-1.5 bg-charcoal-card border border-charcoal-border rounded-xl text-camel-muted text-xs flex items-center gap-2">
                    <DollarSign className="w-3.5 h-3.5 text-camel shrink-0" />
                    <span>Pipeline Capital Weighted: <strong className="text-camel-white">${crmData.deals.reduce((sum,d)=> sum + (d.stage !== 'Won' && d.stage !== 'Lost' ? d.value : 0), 0).toLocaleString()}</strong></span>
                  </div>
                </div>
              </motion.div>

              {/* KANBAN COLS WRAP */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 overflow-x-auto pb-6">
                
                {/* Visual Pipeline Lanes helper loops */}
                {(['Lead', 'Contacted', 'Proposal', 'Negotiation', 'Won', 'Lost'] as const).map(lane => {
                  const laneDeals = crmData.deals.filter(d => d.stage === lane);
                  const laneCapitalVal = laneDeals.reduce((sum, d) => sum + d.value, 0);

                  const laneHeaders: Record<string, { label: string; textStyle: string; progressStyle: string }> = {
                    Lead: { label: 'Leads Base', textStyle: 'text-neutral-400', progressStyle: 'bg-neutral-600' },
                    Contacted: { label: 'Contact Made', textStyle: 'text-neutral-300', progressStyle: 'bg-neutral-500' },
                    Proposal: { label: 'SLA Shared', textStyle: 'text-camel-white', progressStyle: 'bg-neutral-400' },
                    Negotiation: { label: 'Negotiations', textStyle: 'text-camel', progressStyle: 'bg-neutral-300' },
                    Won: { label: 'Deals Won 🏆', textStyle: 'text-white', progressStyle: 'bg-white' },
                    Lost: { label: 'Deals Lost ❌', textStyle: 'text-neutral-500', progressStyle: 'bg-neutral-700' },
                  };

                  return (
                    <motion.div 
                      key={lane} 
                      variants={itemVariants}
                      className="p-3.5 bg-charcoal-card border border-charcoal-border rounded-2xl md:min-h-[500px] flex flex-col space-y-4"
                    >
                      {/* Lane Header details */}
                      <div className="flex justify-between items-start border-b border-charcoal-border pb-2.5">
                        <div>
                          <h4 className={`font-bold text-xs ${laneHeaders[lane].textStyle}`}>{laneHeaders[lane].label}</h4>
                          <span className="text-[10px] text-camel-muted font-mono mt-0.5 block">${laneCapitalVal.toLocaleString()}</span>
                        </div>
                        <span className="text-[9px] px-1.5 py-0.2 bg-charcoal-border rounded-full text-camel font-mono font-bold">
                          {laneDeals.length}
                        </span>
                      </div>

                      {/* Deallist context inside lane */}
                      <div className="space-y-3 overflow-y-auto max-h-[460px] pr-1 flex-1">
                        {laneDeals.length === 0 ? (
                          <div className="text-center py-12 border border-dashed border-charcoal-border rounded-2xl text-[10px] text-camel-muted/40 select-none">
                            Lane Empty
                          </div>
                        ) : (
                          laneDeals.map(deal => (
                            <div 
                              key={deal.id}
                              className="p-3 bg-charcoal-black border border-charcoal-border hover:border-camel/40 rounded-xl shadow transition-all space-y-3 relative group"
                            >
                              {/* Title */}
                              <div>
                                <strong className="block text-xs font-bold text-camel-white group-hover:text-camel truncate leading-snug">{deal.title}</strong>
                                <span className="text-[10px] text-camel-muted mt-0.5 block truncate font-sans">Acct: {deal.company}</span>
                              </div>

                              {/* Value Progress bar */}
                              <div className="space-y-1">
                                <div className="flex justify-between text-[10px] font-mono">
                                  <span className="text-camel font-bold">${deal.value.toLocaleString()}</span>
                                  <span className="text-camel-muted font-semibold">{deal.probability}%</span>
                                </div>
                                <div className="w-full h-1 bg-charcoal-border rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full ${laneHeaders[lane].progressStyle}`} 
                                    style={{ width: `${deal.probability}%` }}
                                  />
                                </div>
                              </div>

                              {/* Move Controls inside Card footer */}
                              <div className="flex items-center justify-between pt-2 border-t border-charcoal-border/50">
                                <span className="text-[9px] text-camel-muted/65 font-mono">Exp: {deal.expectedCloseDate}</span>
                                
                                {/* Trigger controls list */}
                                <div className="flex gap-1">
                                  {lane !== 'Won' && lane !== 'Lost' && (
                                    <>
                                      {/* Forward Stage action */}
                                      <button
                                        onClick={() => {
                                          const order: ('Lead' | 'Contacted' | 'Proposal' | 'Negotiation' | 'Won' | 'Lost')[] = ['Lead', 'Contacted', 'Proposal', 'Negotiation', 'Won'];
                                          const idx = order.indexOf(lane);
                                          if (idx !== -1 && idx < order.length - 1) {
                                            handleMoveDealStage(deal.id, order[idx + 1]);
                                          }
                                        }}
                                        className="p-1 rounded bg-camel/10 hover:bg-camel text-camel hover:text-charcoal-black transition-all text-[9.5px] font-bold cursor-pointer"
                                        title="Shift Forward Stage"
                                      >
                                        ➔
                                      </button>
                                      {/* Direct WON shortcut */}
                                      <button
                                        onClick={() => handleMoveDealStage(deal.id, 'Won')}
                                        className="p-1 rounded bg-white/10 hover:bg-white text-white hover:text-charcoal-black border border-white/5 transition-all text-[9.5px] font-bold cursor-pointer"
                                        title="Mark as Close-Won"
                                      >
                                        ✔
                                      </button>
                                    </>
                                  )}
                                  {lane === 'Won' && (
                                    <span className="text-[9px] text-white font-bold">Won Contract</span>
                                  )}
                                  {lane === 'Lost' && (
                                    <span className="text-[9px] text-neutral-500 font-bold">Lost Lead</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </motion.div>
                  );
                })}

              </div>
            </motion.div>
          )}


          {/* ==================== D: INTERACTIONS LOG JOURNAL VIEW ==================== */}
          {activeTab === 'interactions' && (
            <motion.div
              key="tab-interactions"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              <motion.div variants={itemVariants}>
                <h2 className="text-2xl font-bold tracking-tight text-camel-white">Operations Journal Feed</h2>
                <p className="text-xs text-camel-muted mt-1">Audit log of client phone calls, diagnostic meetings, proposals, and logs recorded</p>
              </motion.div>

              <motion.div variants={itemVariants} className="bg-charcoal-card border border-charcoal-border rounded-2xl shadow-xl overflow-hidden">
                {crmData.interactions.length === 0 ? (
                  <div className="p-16 text-center space-y-4">
                    <Activity className="w-10 h-10 text-camel-muted/50 mx-auto" />
                    <div>
                      <span className="block text-sm text-camel-white font-bold">No interactions recorded</span>
                      <p className="text-xs text-camel-muted mt-1">Go to the Contacts Directory, select a client, and record note updates</p>
                    </div>
                  </div>
                ) : (
                  <div className="divide-y divide-charcoal-border/50">
                    {crmData.interactions.map(item => {
                      const badgeColor = {
                        Call: 'text-neutral-400 bg-neutral-400/10 border-neutral-400/20',
                        Email: 'text-neutral-300 bg-neutral-300/10 border-neutral-300/20',
                        Meeting: 'text-white bg-white/10 border-white/20',
                        Note: 'text-neutral-500 bg-neutral-500/10 border-neutral-500/20',
                        Proposal: 'text-neutral-200 bg-neutral-200/10 border-neutral-200/20',
                      }[item.type];

                      return (
                        <motion.div 
                          key={item.id} 
                          variants={itemVariants}
                          className="p-5 hover:bg-camel/[0.02] transition-colors flex flex-col md:flex-row justify-between gap-4"
                        >
                          <div className="space-y-2 max-w-2xl">
                            <div className="flex flex-wrap items-center gap-2.5">
                              <span className={`px-2 py-0.5 rounded text-[9px] uppercase tracking-wider font-extrabold border ${badgeColor}`}>
                                {item.type}
                              </span>
                              <strong className="text-camel-white text-sm font-bold block">{item.summary}</strong>
                            </div>
                            <p className="text-camel-muted text-xs leading-relaxed bg-charcoal-black p-3 rounded-xl border border-charcoal-border/40">
                              {item.details}
                            </p>
                            <div className="flex items-center gap-1.5 text-[11px] text-camel-muted/60">
                              <span>Client Portfolio Focus:</span>
                              <span className="text-camel font-semibold">{item.contactName}</span>
                            </div>
                          </div>

                          <div className="flex md:flex-col justify-between md:items-end text-right shrink-0 mt-2 md:mt-0">
                            <span className="text-xs font-mono text-camel-muted flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-camel-muted" />
                              {item.date}
                            </span>
                            
                            <button
                              onClick={() => {
                                setCrmData(prev => ({
                                  ...prev,
                                  interactions: prev.interactions.filter(i => i.id !== item.id)
                                }));
                              }}
                              className="text-[10px] text-camel-muted hover:text-white flex items-center gap-1 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Remove Journal Log</span>
                            </button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}


          {/* ==================== E: TASKS & FOLLOWUPS WORKSPACE VIEW ==================== */}
          {activeTab === 'tasks' && (
            <motion.div
              key="tab-tasks"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-camel-white">Actionable Agenda Checklist</h2>
                  <p className="text-xs text-camel-muted mt-1">Assign deliverables, follow up deadlines, and monitor account metrics</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingTask(true)}
                    className="px-4 py-2 bg-gradient-to-r from-camel to-camel-hover hover:from-camel-hover hover:to-camel rounded-xl text-xs font-bold text-charcoal-black shadow-xl transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4 text-charcoal-black" />
                    <span>Create Agenda Task</span>
                  </button>
                </div>
              </motion.div>

              {/* TASK LIST MAIN WORKBENCH */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
                
                {/* Pending Tasks Panel */}
                <motion.div variants={itemVariants} className="xl:col-span-2 bg-charcoal-card border border-charcoal-border rounded-2xl shadow-xl p-6 space-y-4">
                  <h3 className="text-sm font-bold text-camel uppercase tracking-wider font-mono">Pending Tasks Checklist</h3>
                  
                  <div className="space-y-3">
                    {crmData.tasks.filter(t => t.status === 'Pending').length === 0 ? (
                      <div className="p-12 text-center text-camel-muted border border-dashed border-charcoal-border rounded-2xl space-y-3">
                        <CheckCircle className="w-8 h-8 text-white mx-auto" />
                        <div>
                          <strong className="block text-sm text-camel-white">Perfect Score!</strong>
                          <span className="text-[11px] text-camel-muted/60">Every single client deliverable queue is closed</span>
                        </div>
                      </div>
                    ) : (
                      crmData.tasks.filter(t => t.status === 'Pending').map(task => {
                        const priorityColors = {
                          High: 'bg-white/10 border-white/20 text-white font-bold',
                          Medium: 'bg-neutral-600/10 border-neutral-600/20 text-neutral-300',
                          Low: 'bg-neutral-800/20 border-neutral-800/15 text-neutral-500',
                        }[task.priority];

                        return (
                          <div 
                            key={task.id}
                            className="p-4 bg-charcoal-black/60 hover:bg-charcoal-black border border-charcoal-border rounded-xl flex items-center justify-between gap-4 transition-colors"
                          >
                            <div className="flex items-start gap-3.5 min-w-0">
                              <button
                                onClick={() => handleToggleTaskStatus(task.id)}
                                className="mt-0.5 w-5 h-5 rounded-md border border-charcoal-border flex items-center justify-center hover:border-camel hover:bg-camel/10 cursor-pointer text-camel shrink-0"
                                title="Set Task Completed"
                              >
                                <span className="opacity-0 hover:opacity-100 font-extrabold text-[10px]">✔</span>
                              </button>
                              
                              <div className="space-y-1 min-w-0">
                                <span className="block text-xs font-semibold text-camel-white leading-normal leading-relaxed">{task.title}</span>
                                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-camel-muted">
                                  <span className="font-mono text-camel-muted/60 flex items-center gap-1">
                                    <Calendar className="w-3.5 h-3.5 text-camel-muted/65" />
                                    Due: {task.dueDate}
                                  </span>
                                  {task.contactName && (
                                    <span className="text-camel font-medium">For: {task.contactName}</span>
                                  )}
                                  <span className="text-camel-muted/60">Assigned: {task.assignedTo}</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 shrink-0">
                              <span className={`text-[9px] uppercase tracking-wider font-extrabold px-2 py-0.5 border rounded ${priorityColors}`}>
                                {task.priority}
                              </span>
                              <button
                                onClick={() => handleDeleteTask(task.id)}
                                className="p-1.5 rounded-lg border border-charcoal-border hover:border-white/20 text-camel-muted/50 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                                title="Remove Task"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </motion.div>

                {/* Completed Tasks Log Panel */}
                <motion.div variants={itemVariants} className="bg-charcoal-card border border-charcoal-border rounded-2xl shadow-xl p-6 space-y-4">
                  <h3 className="text-sm font-bold text-camel uppercase tracking-wider font-mono">Archive Logs</h3>
                  
                  <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
                    {crmData.tasks.filter(t => t.status === 'Completed').length === 0 ? (
                      <span className="text-camel-muted/50 text-xs block text-center py-6">No tasks archived yet</span>
                    ) : (
                      crmData.tasks.filter(t => t.status === 'Completed').map(task => (
                        <div 
                          key={task.id}
                          className="p-3 bg-charcoal-black border border-charcoal-border/40 rounded-xl flex items-center justify-between gap-3 text-camel-muted/60"
                        >
                          <div className="min-w-0 flex-1">
                            <span className="block text-xs font-medium text-camel-white/70 line-through leading-relaxed truncate">{task.title}</span>
                            <span className="block text-[10px] text-camel-muted/40 font-mono mt-1">Closed on due: {task.dueDate}</span>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            {/* Toggle back to pending */}
                            <button
                              onClick={() => handleToggleTaskStatus(task.id)}
                              className="p-1 text-camel-muted/50 hover:text-camel cursor-pointer"
                              title="Restore back to Pending"
                            >
                              <RotateCcw className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteTask(task.id)}
                              className="p-1 text-camel-muted/50 hover:text-white cursor-pointer"
                              title="Delete permanently"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </motion.div>

              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* ==================== MODALS / FORMS POPUPS ==================== */}
      
      {/* 1. NEW CONTACT POPUP MODAL */}
      <AnimatePresence>
        {isAddingContact && (
          <div id="add-contact-modal" className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="max-w-md w-full p-6 rounded-2xl bg-charcoal-black border border-charcoal-border space-y-6 shadow-2xl"
            >
              <div>
                <h3 className="text-lg font-bold text-camel-white">Onboard New Customer</h3>
                <p className="text-xs text-camel-muted">Specify profile metadata to formulate business leads</p>
              </div>

              <form onSubmit={handleCreateContactSubmit} className="space-y-4 text-xs">
                {/* Name */}
                <div className="space-y-1">
                  <label className="text-camel font-semibold uppercase block text-[10px]">Client Full Name</label>
                  <input
                    type="text"
                    required
                    value={newContactName}
                    onChange={(e) => setNewContactName(e.target.value)}
                    placeholder="e.g. Olivia Vance"
                    className="w-full p-3 rounded-xl bg-charcoal-card border border-charcoal-border hover:border-camel/40 focus:border-camel text-camel-white outline-none"
                  />
                </div>

                {/* Company */}
                <div className="space-y-1">
                  <label className="text-camel font-semibold uppercase block text-[10px]">Organization Company</label>
                  <input
                    type="text"
                    required
                    value={newContactCompany}
                    onChange={(e) => setNewContactCompany(e.target.value)}
                    placeholder="e.g. Aurora Cloud Corp"
                    className="w-full p-3 rounded-xl bg-charcoal-card border border-charcoal-border hover:border-camel/40 focus:border-camel text-camel-white outline-none"
                  />
                </div>

                {/* Email and Phone Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-camel font-semibold uppercase block text-[10px]">Email (Optional)</label>
                    <input
                      type="email"
                      value={newContactEmail}
                      onChange={(e) => setNewContactEmail(e.target.value)}
                      placeholder="olivia@domain.io"
                      className="w-full p-3 rounded-xl bg-charcoal-card border border-charcoal-border focus:border-camel text-camel-white outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-camel font-semibold uppercase block text-[10px]">Phone Number</label>
                    <input
                      type="text"
                      value={newContactPhone}
                      onChange={(e) => setNewContactPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full p-3 rounded-xl bg-charcoal-card border border-charcoal-border focus:border-camel text-camel-white outline-none"
                    />
                  </div>
                </div>

                {/* Value and Status Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-camel font-semibold uppercase block text-[10px]">Estimated Deal Capital ($)</label>
                    <input
                      type="number"
                      required
                      value={newContactVal}
                      onChange={(e) => setNewContactVal(e.target.value)}
                      className="w-full p-3 rounded-xl bg-charcoal-card border border-charcoal-border focus:border-camel text-camel-white outline-none font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-camel font-semibold uppercase block text-[10px]">Initial Sale Stage</label>
                    <select
                      value={newContactStatus}
                      onChange={(e: any) => setNewContactStatus(e.target.value)}
                      className="w-full p-3 rounded-xl bg-charcoal-card border border-charcoal-border text-camel-white outline-none cursor-pointer uppercase font-bold"
                    >
                      <option value="Lead">Lead</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Proposal">Proposal</option>
                      <option value="Negotiation">Negotiation</option>
                      <option value="Won">Won</option>
                      <option value="Lost">Lost</option>
                    </select>
                  </div>
                </div>

                {/* Tags */}
                <div className="space-y-1">
                  <label className="text-camel font-semibold uppercase block text-[10px]">Tags (split with commas)</label>
                  <input
                    type="text"
                    value={newContactTags}
                    onChange={(e) => setNewContactTags(e.target.value)}
                    placeholder="SaaS, Key-Client, APAC"
                    className="w-full p-3 rounded-xl bg-charcoal-card border border-charcoal-border focus:border-camel text-camel-white outline-none"
                  />
                </div>

                {/* Submits */}
                <div className="flex gap-3 justify-end pt-4">
                  <button
                    type="button"
                    onClick={() => setIsAddingContact(false)}
                    className="px-4 py-2.5 rounded-xl border border-charcoal-border bg-charcoal-card hover:bg-charcoal-border/50 text-camel-muted hover:text-camel-white font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-camel to-camel-hover hover:from-camel-hover hover:to-camel text-charcoal-black font-extrabold cursor-pointer"
                  >
                    Provision Client Portal
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. CREATING AGENDA TASK MODAL */}
      <AnimatePresence>
        {isAddingTask && (
          <div id="add-task-modal" className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="max-w-md w-full p-6 rounded-2xl bg-charcoal-black border border-charcoal-border space-y-6 shadow-2xl"
            >
              <div>
                <h3 className="text-lg font-bold text-camel-white">Create Agenda Task</h3>
                <p className="text-xs text-camel-muted">Establish deliverables and followups queued with contacts</p>
              </div>

              <form onSubmit={handleCreateTaskSubmit} className="space-y-4 text-xs">
                {/* Title */}
                <div className="space-y-1">
                  <label className="text-camel font-semibold uppercase block text-[10px]">Task Objective Title</label>
                  <input
                    type="text"
                    required
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    placeholder="e.g. Schedule C-Suite legal signoff"
                    className="w-full p-3 rounded-xl bg-charcoal-card border border-charcoal-border text-camel-white outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Due Date */}
                  <div className="space-y-1">
                    <label className="text-camel font-semibold uppercase block text-[10px]">Due Date</label>
                    <input
                      type="date"
                      required
                      value={newTaskDueDate}
                      onChange={(e) => setNewTaskDueDate(e.target.value)}
                      className="w-full p-3 rounded-xl bg-charcoal-card border border-charcoal-border text-camel-white outline-none font-mono"
                    />
                  </div>

                  {/* Priority */}
                  <div className="space-y-1">
                    <label className="text-camel font-semibold uppercase block text-[10px]">Priority Vector</label>
                    <select
                      value={newTaskPriority}
                      onChange={(e: any) => setNewTaskPriority(e.target.value)}
                      className="w-full p-3 rounded-xl bg-charcoal-card border border-charcoal-border text-camel-white cursor-pointer outline-none font-bold"
                    >
                      <option value="High">🚨 High</option>
                      <option value="Medium">⚡ Medium</option>
                      <option value="Low">💤 Low</option>
                    </select>
                  </div>
                </div>

                {/* Assigned Portfolio selection */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-camel font-semibold uppercase block text-[10px]">Linked Client Focus</label>
                    <select
                      value={newTaskContactId}
                      onChange={(e) => setNewTaskContactId(e.target.value)}
                      className="w-full p-3 rounded-xl bg-charcoal-card border border-charcoal-border text-camel-white cursor-pointer outline-none truncate"
                    >
                      <option value="">No custom link (Global task)</option>
                      {crmData.contacts.map(c => (
                        <option key={c.id} value={c.id}>{c.name} ({c.company})</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-camel font-semibold uppercase block text-[10px]">Responsible Assignee</label>
                    <input
                      type="text"
                      required
                      value={newTaskAssigned}
                      onChange={(e) => setNewTaskAssigned(e.target.value)}
                      placeholder="e.g. Account Executive"
                      className="w-full p-3 rounded-xl bg-charcoal-card border border-charcoal-border text-camel-white outline-none"
                    />
                  </div>
                </div>

                {/* Submits */}
                <div className="flex gap-3 justify-end pt-4">
                  <button
                    type="button"
                    onClick={() => setIsAddingTask(false)}
                    className="px-4 py-2.5 rounded-xl border border-charcoal-border bg-charcoal-card hover:bg-charcoal-border/50 text-camel-muted hover:text-camel-white font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-camel to-camel-hover hover:from-camel-hover hover:to-camel text-charcoal-black font-extrabold cursor-pointer"
                  >
                    Commit Deliverable
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
