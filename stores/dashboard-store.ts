import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { DashboardFilters } from "@/lib/db/schema";

interface DashboardState {
  // Selected filters
  filters: DashboardFilters;
  // Currently selected teacher for detailed view
  selectedTeacherId: number | null;
  // Stats toggles
  showFailedClasses: boolean;
  showTopStudents: boolean;
  showTeacherPerformance: boolean;
  // Active subject for detailed analysis
  activeSubject: string | null;
  // Methods
  setFilters: (filters: Partial<DashboardFilters>) => void;
  resetFilters: () => void;
  setSelectedTeacherId: (id: number | null) => void;
  setShowFailedClasses: (show: boolean) => void;
  setShowTopStudents: (show: boolean) => void;
  setShowTeacherPerformance: (show: boolean) => void;
  setActiveSubject: (subject: string | null) => void;
}

const initialFilters: DashboardFilters = {
  section: undefined,
  teacherId: undefined,
  subject: undefined,
  minScore: 0,
  maxScore: 30,
  dateRange: undefined,
};

export const useDashboardStore = create<DashboardState>()(
  devtools((set) => ({
    // Initial state
    filters: { ...initialFilters },
    selectedTeacherId: null,
    showFailedClasses: true,
    showTopStudents: true,
    showTeacherPerformance: true,
    activeSubject: null,

    // Actions
    setFilters: (newFilters) =>
      set(
        (state) => ({
          filters: { ...state.filters, ...newFilters },
        }),
        false,
        "setFilters"
      ),

    resetFilters: () =>
      set(
        { filters: { ...initialFilters } },
        false,
        "resetFilters"
      ),

    setSelectedTeacherId: (id) =>
      set(
        { selectedTeacherId: id },
        false,
        "setSelectedTeacherId"
      ),

    setShowFailedClasses: (show) =>
      set(
        { showFailedClasses: show },
        false,
        "setShowFailedClasses"
      ),

    setShowTopStudents: (show) =>
      set(
        { showTopStudents: show },
        false,
        "setShowTopStudents"
      ),

    setShowTeacherPerformance: (show) =>
      set(
        { showTeacherPerformance: show },
        false,
        "setShowTeacherPerformance"
      ),

    setActiveSubject: (subject) =>
      set(
        { activeSubject: subject },
        false,
        "setActiveSubject"
      ),
  }))
); 