export interface DrawResult {
    PrimaryNumbers: number[]
    SecondaryNumbers: number[]
    ProductId?: string
    DrawNumber?: number
    DrawDate?: string
    DrawDisplayName?: string
    DrawLogoUrl?: string
    TicketNumbers?: number[]
    Dividends?: Dividend[]
    PrizeBoostPercent?: number
    PrizeBoost?: number
}

interface Dividend {
    Division: number
    BlocNumberOfWinners: number
    BlocDividend: number
    CompanyId: string
    CompanyNumberOfWinners: number
    CompanyDividend: number
    PoolTransferType: string
    PoolTransferredTo: number
    PrizeBoostValue: number
}

export interface LottoResults {
    DrawResults: DrawResult[]
    ErrorInfo: string | null
    Success: boolean
}

export interface ILottoApiBody {
    CompanyId: string
    MaxDrawCountPerProduct: number
    OptionalProductFilter: string[]
}
