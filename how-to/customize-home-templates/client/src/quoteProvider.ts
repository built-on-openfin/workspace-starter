import {
    CLIDispatchedSearchResult,
    CLISearchResponse, CLISearchResult,
    CLITemplate,
    HomeSearchResult
} from "@openfin/workspace";
import { CustomSettings, QuoteResult } from "./shapes";
import { getQuoteTemplate } from "./templates";
import { Chart, LineController, CategoryScale, LinearScale, LineElement, PointElement, TimeScale, Filler } from "chart.js";
import { DateTime } from "luxon";

Chart.register(LineController, CategoryScale, LinearScale, LineElement, PointElement, TimeScale, Filler);

export const providerId: string = "quote";

export const QUOTE_PROVIDER_DETAILS_ACTION = "Quote Details";

export async function quoteProviderGetResults(settings: CustomSettings, query: string): Promise<CLISearchResponse> {
    const results: CLISearchResult<any>[] = [];

    if (query.startsWith("/quote ") && settings?.quoteProvider?.rootUrl) {
        let symbol = query.slice(7);

        if (symbol.length > 0 && /^[a-z]+$/i.test(symbol)) {
            symbol = symbol.toUpperCase();

            const now = DateTime.now();

            const quoteData = await getQuoteData(
                settings, 
                symbol, 
                now.minus({ months: 1 }).toFormat("yyyy-LL-dd"), 
                now.toFormat("yyyy-LL-dd"));

            let price;
            let company;
            let data;

            if (quoteData?.data?.lastSalePrice) {
                price = quoteData.data.lastSalePrice;
                company = quoteData.data.company;
                data = quoteData.data.chart;
            }

            if (price !== undefined) {
                const graphImage = await renderGraph(data);

                const quoteResult: HomeSearchResult = {
                    key: `quote-${symbol}`,
                    title: symbol,
                    label: "App",
                    actions: [
                        { name: QUOTE_PROVIDER_DETAILS_ACTION, hotkey: "Enter" }
                    ],
                    data: {
                        providerId,
                        url: `https://www.nasdaq.com/market-activity/stocks/${symbol.toLowerCase()}`
                    },
                    template: CLITemplate.Custom,
                    templateContent: {
                        layout: getQuoteTemplate({ detailsAction: QUOTE_PROVIDER_DETAILS_ACTION }),
                        data: {
                            symbol,
                            priceTitle: "Price",
                            price,
                            company,
                            graph: graphImage,
                            detailsTitle: "Details"
                        }
                    }
                };
                results.push(quoteResult);
            }
        }
    }

    return {
        results
    };
}

export async function quoteProviderHandleAction(result: CLIDispatchedSearchResult): Promise<void> {
    if (result.action.name === QUOTE_PROVIDER_DETAILS_ACTION && result.data.url) {
        await fin.System.openUrlWithBrowser(result.data.url);
    }
}

async function getQuoteData(settings: CustomSettings, symbol: string, from: string, to: string): Promise<QuoteResult | undefined> {
    try {
        const symbolUrl = `${settings?.quoteProvider?.rootUrl}${symbol}.json`;
        const response = await fetch(symbolUrl);

        const json: QuoteResult = await response.json();

        return json;
    } catch (err) {
        console.error(err);
    }
}

async function renderGraph(data: { x: number, y: number }[]): Promise<string> {
    const canvas = document.createElement("canvas");
    canvas.width = 250;
    canvas.height = 110;
    const ctx = canvas.getContext('2d');

    const chart = new Chart(ctx,
        {
            type: "line",
            data: {
                labels: data.map(d => d.x),
                datasets: [
                    {
                        fill: "origin",
                        backgroundColor: "green",
                        radius: 0,
                        data,
                    } as any
                ]
            },
            options: {
                animation: false,
                responsive: false,
                scales: {
                    xAxis: {
                        display: false
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    chart.update();
    return chart.toBase64Image('image/jpeg', 1);
}
