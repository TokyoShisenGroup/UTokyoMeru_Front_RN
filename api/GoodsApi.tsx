import axios from "axios";
import { GoodProps, GoodPropsSimplified } from "@/types";
import { API_URL } from "@/constants/config";

interface GetGood{
    GoodID: number;
	CreatedTime: Date;
	UpdatedTime: Date;
	Title: string;
	Description: string;
	Images: string[];
	Price: number;
	Views: number;
	Likes: number;
	IsInvisible: boolean;
	IsDeleted: boolean;
	IsBought: boolean;
	Tags: string[];
	SellerID: number;
}

export const getGoodsOfHomePage = async (): Promise<GoodPropsSimplified[] | undefined> => {
    try{
        const response = await axios.get(`${API_URL}/goods`);

    var goods: GoodPropsSimplified[] = [];
    for (const good of response.data){
        goods.push({
            id: good.GoodID,
            title: good.Title,
            image: good.Images[0],
            price: good.Price,
            description: good.Description,
            user: good.SellerID,
        })
    }
    return goods;
} catch (error) {
    console.error(error);
    return undefined;
}
}   

export const getGoodDetail = async (goodID: number): Promise<GoodProps | undefined> => {
    try{
        const response = await axios.get(`${API_URL}/goods/${goodID}`);
        const good: GoodProps ={
        id: response.data.GoodID,
        title: response.data.Title,
        images: response.data.Images,
        price: response.data.Price,
        description: response.data.Description,
        user: response.data.SellerID,
        tags: response.data.Tags,
    }
    return good;
} catch (error) {
    console.error(error);
    return undefined;
}
}
