import { Language, LanguageInfo } from "../types/index";

const LANGUAGES: Record<Language, LanguageInfo> = {
  en: {
    code: "en",
    name: "English",
    flag: "🇺🇸",
  },
  fr: {
    code: "fr",
    name: "Français",
    flag: "🇫🇷",
  },
};

const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    // Navigation & Headers
    dashboard: "Dashboard",
    audits: "Audits",
    drafts: "Drafts",
    profile: "Profile",
    start_audit: "Start Audit",
    business_enterprise: "Business Enterprise",

    // Dashboard
    monitor_business: "Monitor your business performance and audit status",
    this_months_snapshot: "This Month's Snapshot",
    revenue: "Revenue",
    expenses: "Expenses",
    risk_score: "Risk Score",
    good_standing: "Good Standing",
    low_risk: "Low Risk",
    last_audit_status: "Last Audit Status",
    last_audit_date: "Last Audit Date:",
    next_audit_due: "Next Audit Due:",
    quick_actions: "Quick Actions",
    view_audit_report: "View Audit Report",
    recent_activity: "Recent Activity",
    audited_august: "Audited august,2025",
    viewed_audit_report: "Viewed Audit Report",
    saved_draft: "Saved Draft",
    hrs_ago: "hrs ago",

    // Start Audit
    upload_documents: "Upload your business documents for audit",
    upload_info: "Upload receipts, bills, or inventory photos for this month",
    receipts: "Receipts",
    bills: "Bills",
    inventory: "Inventory",
    payroll: "Payroll",
    take_photo: "Take Photo",
    use_camera: "Use camera to Capture document",
    upload_files: "Upload Files",
    upload_file_types: "PDF, images, Excel, word",
    voice_note: "Voice Note",
    ai_transcribe: "AI will transcribe",
    uploaded_files: "Uploaded Files",
    save_draft: "Save Draft",

    // Progress
    assessing_risks: "Assessing risks......",
    processing_progress: "Processing progress",
    complete: "complete",
    analyzing_receipts: "Analyzing receipts.......",
    checking_inventory: "Checking inventory.......",
    assessing_risks_step: "Assessing risks.......",
    generating_insights: "Generating insights.......",
    finalizing_report: "Finalizing report.......",
    cancel_process: "Cancel Process",

    // Report
    your_august_report: "Your August Report",
    everything_looks_good: "Everything looks good! Here's what we found.",
    expenses_well_made: "Expenses well Made",
    expenses_properly_made: "87% of expenses was properly made this month",
    revenue_up: "Revenue Up 15%",
    strong_growth: "Strong growth compared to last month",
    stock_alert: "Stock Alert",
    stock_levels_exceed: "Stock levels exceed optimal thresholds",
    ai_recommendations: "AI Recommendations",
    cut_utility_costs: "Cut Utility Costs",
    bills_increased: "Bills increased 12% from last month",
    inventory_management: "Inventory Management",
    consider_discounting: "Consider discounting slow-moving items",
    optimize_payment_terms: "Optimize Payment Terms",
    negotiate_payment: "Negotiate payment with suppliers to improve cash flow",
    high_priority: "High Priority",
    medium_priority: "Medium Priority",
    low_priority: "Low Priority",
    mark_as_done: "Mark as Done",
    dismiss: "Dismiss",

    // Profile/Settings
    notification: "Notification",
    push_notification: "Push Notification",
    email_reports: "Email Reports",
    data_privacy: "Data & Privacy",
    auto_backup: "Auto Backup",
    privacy_policy: "Privacy Policy",

    // AI Chatbot
    ai_assistant: "AI Assistant",
    ai_online: "Online",
    ai_offline: "Offline - API Key Required",
    ai_welcome_message:
      "Hello! I'm your AI audit assistant. I can help you with business analysis, risk assessment, and audit guidance. How can I assist you today?",
    ai_placeholder: "Ask me about your business audit...",
    ai_typing: "AI is thinking...",
    ai_no_api_key:
      "Please add your AI API key in settings to enable AI features.",
    ai_error_message:
      "Sorry, I encountered an error. Please try again or check your API key.",
    ai_audit_response:
      "I can help you with your business audit! Based on your documents, I can analyze risks, identify opportunities, and provide recommendations. Would you like me to review specific areas of your business?",
    ai_risk_response:
      "Risk assessment is crucial for business health. I can analyze your financial data, inventory levels, and operational patterns to identify potential risks and suggest mitigation strategies.",
    ai_help_response:
      "I'm here to help! I can assist with audit preparation, financial analysis, risk assessment, compliance questions, and business optimization. What specific area would you like to focus on?",
    ai_general_response:
      "I'm your AI audit assistant. I can help analyze your business data, identify risks and opportunities, and provide actionable recommendations. Feel free to ask me anything about your business audit!",
    preferences: "Preferences",
    dark_mode: "Dark Mode",
    currency: "Currency",
    language: "Language",
    subscription: "Subscription",
    business_pro: "Business Pro",
    next_billing: "Next billing • July 10,2020",
    manage_subscription: "Manage Subscription",
    view_plans: "View Plans",
    support: "Support",
    help_center: "Help Center",
    contact_support: "Contact Support",
    sign_out: "Sign Out",
    delete_account: "Delete Account",
    edit_profile: "Edit Profile",

    // Audit Screen
    this_week: "This Week",
    last_month: "Last Month",
    completed: "Completed",
    pending: "Pending",

    // General
    back: "Back",
    cancel: "Cancel",
    done: "Done",
    save: "Save",
    delete: "Delete",
    edit: "Edit",
    mb: "MB",
    created: "Created",
    last_modified: "Last modified",

    // Additional translations for missing text
    file: "File",
    photo_jpg: "Photo.jpg",
    voice_note_demo: "Voice note is mocked in this demo.",
    pdf_images_excel_word: "PDF, images, Excel, word",
    use_camera_capture: "Use camera to Capture document",
    ai_will_transcribe: "AI will transcribe",
    audit_complete_message:
      "Audit report has been marked as complete. Great work!",
    analyzing_receipts_done: "✓ Analyzing receipts...",
    checking_inventory_done: "✓ Checking inventory...",
    step_3_assessing: "3. Assessing risks...",
    step_4_generating: "4. Generating insights...",
    step_5_finalizing: "5. Finalizing report...",

    // Authentication translations
    set_up_audit_account: "Set up your audit account to get started",
    sign_in_up_streamline: "Sign in/up to streamline your audit management",
    login: "Login",
    register: "Register",
    full_name: "Full Name",
    email_address: "Email Address",
    business_name: "Business Name",
    annual_revenue: "Annual Revenue",
    monthly_expenses: "Monthly Expenses",
    password: "Password",
    remember_me: "Remember me",
    forget_password: "Forget Password?",
    or_login_with: "Or login with",
    google: "Google",
    facebook: "Facebook",
    welcome_back: "Welcome Back",
    email: "Email",
    sign_in: "Sign In",
    create_account: "Create Account",
    or_continue_with: "Or continue with",
    error: "Error",
    please_fill_required_fields: "Please fill in all required fields",
    success: "Success",
    account_created_successfully: "Account created successfully",
    logging_in_with: "Logging in with",
    info: "Info",
    streamline_audit_management:
      "Streamline audit management and enhance organizational oversight",
    ai_powered_platform:
      "The ultimate AI-powered audit management platform designed to revolutionize your audit processes and supercharge your audit intelligence",
    get_started: "Get Started",
    start_free_trial: "Start Free Trial",

    // Draft management
    edit_draft: "Edit Draft",
    delete_draft: "Delete Draft",
    confirm_delete_draft: "Are you sure you want to delete this draft?",
    draft_deleted: "Draft has been deleted successfully",
    cannot_undo: "This action cannot be undone.",
  },
  fr: {
    // Navigation & Headers
    dashboard: "Tableau de bord",
    audits: "Audits",
    drafts: "Brouillons",
    profile: "Profil",
    start_audit: "Démarrer l'audit",
    business_enterprise: "Entreprise commerciale",

    // Dashboard
    monitor_business:
      "Surveillez les performances de votre entreprise et le statut d'audit",
    this_months_snapshot: "Instantané de ce mois",
    revenue: "Revenus",
    expenses: "Dépenses",
    risk_score: "Score de risque",
    good_standing: "Bonne position",
    low_risk: "Risque faible",
    last_audit_status: "Statut du dernier audit",
    last_audit_date: "Date du dernier audit:",
    next_audit_due: "Prochain audit dû:",
    quick_actions: "Actions rapides",
    view_audit_report: "Voir le rapport d'audit",
    recent_activity: "Activité récente",
    audited_august: "Audité en août 2025",
    viewed_audit_report: "Rapport d'audit consulté",
    saved_draft: "Brouillon sauvegardé",
    hrs_ago: "h il y a",

    // Start Audit
    upload_documents: "Téléchargez vos documents commerciaux pour l'audit",
    upload_info:
      "Téléchargez les reçus, factures ou photos d'inventaire de ce mois",
    receipts: "Reçus",
    bills: "Factures",
    inventory: "Inventaire",
    payroll: "Paie",
    take_photo: "Prendre une photo",
    use_camera: "Utilisez l'appareil photo pour capturer le document",
    upload_files: "Télécharger des fichiers",
    upload_file_types: "PDF, images, Excel, Word",
    voice_note: "Note vocale",
    ai_transcribe: "L'IA va transcrire",
    uploaded_files: "Fichiers téléchargés",
    save_draft: "Sauvegarder le brouillon",

    // Progress
    assessing_risks: "Évaluation des risques......",
    processing_progress: "Progression du traitement",
    complete: "terminé",
    analyzing_receipts: "Analyse des reçus.......",
    checking_inventory: "Vérification de l'inventaire.......",
    assessing_risks_step: "Évaluation des risques.......",
    generating_insights: "Génération d'insights.......",
    finalizing_report: "Finalisation du rapport.......",
    cancel_process: "Annuler le processus",

    // Report
    your_august_report: "Votre rapport d'août",
    everything_looks_good: "Tout semble bon! Voici ce que nous avons trouvé.",
    expenses_well_made: "Dépenses bien faites",
    expenses_properly_made:
      "87% des dépenses ont été correctement effectuées ce mois-ci",
    revenue_up: "Revenus en hausse de 15%",
    strong_growth: "Forte croissance par rapport au mois dernier",
    stock_alert: "Alerte stock",
    stock_levels_exceed: "Les niveaux de stock dépassent les seuils optimaux",
    ai_recommendations: "Recommandations IA",
    cut_utility_costs: "Réduire les coûts des services publics",
    bills_increased:
      "Les factures ont augmenté de 12% par rapport au mois dernier",
    inventory_management: "Gestion des stocks",
    consider_discounting: "Envisagez de réduire les articles à rotation lente",
    optimize_payment_terms: "Optimiser les conditions de paiement",
    negotiate_payment:
      "Négocier le paiement avec les fournisseurs pour améliorer la trésorerie",
    high_priority: "Priorité élevée",
    medium_priority: "Priorité moyenne",
    low_priority: "Priorité faible",
    mark_as_done: "Marquer comme terminé",
    dismiss: "Ignorer",

    // Profile/Settings
    notification: "Notification",
    push_notification: "Notification push",
    email_reports: "Rapports par e-mail",
    data_privacy: "Données et confidentialité",
    auto_backup: "Sauvegarde automatique",
    privacy_policy: "Politique de confidentialité",

    // AI Chatbot
    ai_assistant: "Assistant IA",
    ai_online: "En ligne",
    ai_offline: "Hors ligne - Clé API requise",
    ai_welcome_message:
      "Bonjour! Je suis votre assistant d'audit IA. Je peux vous aider avec l'analyse commerciale, l'évaluation des risques et les conseils d'audit. Comment puis-je vous aider aujourd'hui?",
    ai_placeholder: "Demandez-moi votre audit d'entreprise...",
    ai_typing: "L'IA réfléchit...",
    ai_no_api_key:
      "Veuillez ajouter votre clé API IA dans les paramètres pour activer les fonctionnalités IA.",
    ai_error_message:
      "Désolé, j'ai rencontré une erreur. Veuillez réessayer ou vérifier votre clé API.",
    ai_audit_response:
      "Je peux vous aider avec votre audit d'entreprise! Basé sur vos documents, je peux analyser les risques, identifier les opportunités et fournir des recommandations. Voulez-vous que j'examine des domaines spécifiques de votre entreprise?",
    ai_risk_response:
      "L'évaluation des risques est cruciale pour la santé de l'entreprise. Je peux analyser vos données financières, niveaux d'inventaire et modèles opérationnels pour identifier les risques potentiels et suggérer des stratégies d'atténuation.",
    ai_help_response:
      "Je suis là pour vous aider! Je peux vous assister dans la préparation d'audit, l'analyse financière, l'évaluation des risques, les questions de conformité et l'optimisation commerciale. Quel domaine spécifique souhaitez-vous aborder?",
    ai_general_response:
      "Je suis votre assistant d'audit IA. Je peux vous aider à analyser vos données commerciales, identifier les risques et opportunités, et fournir des recommandations actionnables. N'hésitez pas à me poser des questions sur votre audit d'entreprise!",
    preferences: "Préférences",
    dark_mode: "Mode sombre",
    currency: "Devise",
    language: "Langue",
    subscription: "Abonnement",
    business_pro: "Business Pro",
    next_billing: "Prochaine facturation • 10 juillet 2020",
    manage_subscription: "Gérer l'abonnement",
    view_plans: "Voir les plans",
    support: "Support",
    help_center: "Centre d'aide",
    contact_support: "Contacter le support",
    sign_out: "Se déconnecter",
    delete_account: "Supprimer le compte",
    edit_profile: "Modifier le profil",

    // Audit Screen
    this_week: "Cette semaine",
    last_month: "Le mois dernier",
    completed: "Terminé",
    pending: "En attente",

    // General
    back: "Retour",
    cancel: "Annuler",
    done: "Terminé",
    save: "Sauvegarder",
    delete: "Supprimer",
    edit: "Modifier",
    mb: "Mo",
    created: "Créé",
    last_modified: "Dernière modification",

    // Additional translations for missing text (French)
    file: "Fichier",
    photo_jpg: "Photo.jpg",
    voice_note_demo: "La note vocale est simulée dans cette démo.",
    pdf_images_excel_word: "PDF, images, Excel, Word",
    use_camera_capture: "Utilisez l'appareil photo pour capturer le document",
    ai_will_transcribe: "L'IA va transcrire",
    audit_complete_message:
      "Le rapport d'audit a été marqué comme terminé. Excellent travail!",
    analyzing_receipts_done: "✓ Analyse des reçus...",
    checking_inventory_done: "✓ Vérification de l'inventaire...",
    step_3_assessing: "3. Évaluation des risques...",
    step_4_generating: "4. Génération d'insights...",
    step_5_finalizing: "5. Finalisation du rapport...",

    // Authentication translations (French)
    set_up_audit_account: "Configurez votre compte d'audit pour commencer",
    sign_in_up_streamline:
      "Connectez-vous pour optimiser votre gestion d'audit",
    login: "Connexion",
    register: "S'inscrire",
    full_name: "Nom complet",
    email_address: "Adresse e-mail",
    business_name: "Nom de l'entreprise",
    annual_revenue: "Revenus annuels",
    monthly_expenses: "Dépenses mensuelles",
    password: "Mot de passe",
    remember_me: "Se souvenir de moi",
    forget_password: "Mot de passe oublié ?",
    or_login_with: "Ou se connecter avec",
    google: "Google",
    facebook: "Facebook",
    welcome_back: "Bon retour",
    email: "Email",
    sign_in: "Se connecter",
    create_account: "Créer un compte",
    or_continue_with: "Ou continuer avec",
    error: "Erreur",
    please_fill_required_fields: "Veuillez remplir tous les champs requis",
    success: "Succès",
    account_created_successfully: "Compte créé avec succès",
    logging_in_with: "Connexion avec",
    info: "Info",
    streamline_audit_management:
      "Optimisez la gestion d'audit et renforcez la surveillance organisationnelle",
    ai_powered_platform:
      "La plateforme ultime de gestion d'audit alimentée par l'IA, conçue pour révolutionner vos processus d'audit et dynamiser votre intelligence d'audit",
    get_started: "Commencer",
    start_free_trial: "Démarrer l'essai gratuit",

    // Draft management (French)
    edit_draft: "Modifier le brouillon",
    delete_draft: "Supprimer le brouillon",
    confirm_delete_draft: "Êtes-vous sûr de vouloir supprimer ce brouillon ?",
    draft_deleted: "Le brouillon a été supprimé avec succès",
    cannot_undo: "Cette action ne peut pas être annulée.",
  },
};

export class I18nService {
  private static instance: I18nService;
  private currentLanguage: Language = "en";
  private listeners: Array<() => void> = [];

  static getInstance(): I18nService {
    if (!I18nService.instance) {
      I18nService.instance = new I18nService();
    }
    return I18nService.instance;
  }

  setLanguage(language: Language): void {
    if (this.currentLanguage !== language) {
      this.currentLanguage = language;
      // Notify all listeners that language has changed
      this.listeners.forEach((listener) => listener());
    }
  }

  addListener(listener: () => void): () => void {
    this.listeners.push(listener);
    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  getCurrentLanguage(): Language {
    return this.currentLanguage;
  }

  getAllLanguages(): LanguageInfo[] {
    return Object.values(LANGUAGES);
  }

  getLanguageInfo(code: Language): LanguageInfo {
    return LANGUAGES[code];
  }

  // Translate a key to current language
  t(key: string): string {
    const translation = TRANSLATIONS[this.currentLanguage]?.[key];
    if (!translation) {
      console.warn(
        `Missing translation for key: ${key} in language: ${this.currentLanguage}`
      );
      return TRANSLATIONS["en"][key] || key; // Fallback to English or the key itself
    }
    return translation;
  }

  // Translate with interpolation
  ti(key: string, params: Record<string, string | number>): string {
    let translation = this.t(key);

    Object.entries(params).forEach(([param, value]) => {
      translation = translation.replace(`{{${param}}}`, String(value));
    });

    return translation;
  }
}

export const i18nService = I18nService.getInstance();
